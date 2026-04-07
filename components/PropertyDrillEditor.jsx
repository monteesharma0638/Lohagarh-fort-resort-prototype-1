"use client";

// components/PropertyDrillEditor.jsx
//
// Renders a "drill-down" editor for any nested MongoDB document.
// Leaf values (strings, numbers, booleans) → editable inline.
// Objects and arrays with depth → shown as nav cards that link deeper.
// Arrays of primitives → shown as editable inline list.

import { useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

// ─── Path helpers ─────────────────────────────────────────────────────────────

function getAtPath(obj, path) {
  return path.reduce((acc, k) => (acc == null ? undefined : acc[k]), obj);
}


function typeOf(v) {
  if (v === null) return "null";
  if (Array.isArray(v)) return "array";
  return typeof v;
}

function isLeaf(v) {
  const t = typeOf(v);
  return t === "string" || t === "number" || t === "boolean" || t === "null";
}

function isArrayOfPrimitives(arr) {
  return Array.isArray(arr) && arr.every((v) => isLeaf(v));
}

function labelFromKey(key) {
  return String(key)
    .replace(/[-_&]/g, " ")
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

function typeLabel(v) {
  if (Array.isArray(v)) return `${v.length} item${v.length !== 1 ? "s" : ""}`;
  if (v && typeof v === "object") return `${Object.keys(v).length} fields`;
  return "";
}

// Deep clone via JSON — safe for plain mongo data (no Date/undefined fields)
function deepClone(v) {
  return JSON.parse(JSON.stringify(v));
}

// Produce a blank template from an existing value:
// strings → "", numbers → 0, booleans → false, arrays → [], objects → recurse
function blankFrom(v) {
  if (v === null || v === undefined) return "";
  if (typeof v === "string") return "";
  if (typeof v === "number") return 0;
  if (typeof v === "boolean") return false;
  if (Array.isArray(v)) return [];
  if (typeof v === "object") {
    return Object.fromEntries(Object.entries(v).map(([k, val]) => [k, blankFrom(val)]));
  }
  return "";
}

// ─── Base path for navigation ─────────────────────────────────────────────────

function basePath(documentId) {
  return `/admin/dashboard/properties/${documentId}`;
}

function navPath(documentId, path) {
  if (path.length === 0) return basePath(documentId);
  return `${basePath(documentId)}/${path.join("/")}`;
}

// ─── Inline leaf editor ───────────────────────────────────────────────────────

function LeafEditor({ fieldKey, value, onChange }) {
  const t = typeOf(value);
  const isLong = t === "string" && (value?.length > 100 || value?.includes("\n"));

  return (
    <div className="field-row">
      <label className="field-label">{labelFromKey(fieldKey)}</label>
      <div className="field-input">
        {t === "boolean" ? (
          <button
            className={`toggle ${value ? "on" : ""}`}
            onClick={() => onChange(!value)}
            type="button"
          >
            <span className="toggle-knob" />
          </button>
        ) : t === "number" ? (
          <input
            type="number"
            value={value ?? ""}
            onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
          />
        ) : isLong ? (
          <textarea
            value={value ?? ""}
            rows={Math.min(10, Math.max(3, Math.ceil((value?.length ?? 0) / 90)))}
            onChange={(e) => onChange(e.target.value)}
          />
        ) : (
          <input
            type="text"
            value={value ?? ""}
            onChange={(e) => onChange(e.target.value)}
          />
        )}
      </div>
    </div>
  );
}

// ─── Inline primitive array editor ───────────────────────────────────────────

function PrimitiveArrayEditor({ fieldKey, value, onChange }) {
  return (
    <div className="field-row align-start">
      <label className="field-label">{labelFromKey(fieldKey)}</label>
      <div className="field-input">
        {value.map((item, i) => (
          <div key={i} className="array-item-row">
            <input
              type={typeof item === "number" ? "number" : "text"}
              value={item ?? ""}
              onChange={(e) => {
                const next = [...value];
                next[i] = typeof item === "number" ? parseFloat(e.target.value) || 0 : e.target.value;
                onChange(next);
              }}
            />
            <button
              className="icon-btn danger"
              type="button"
              onClick={() => onChange(value.filter((_, j) => j !== i))}
            >
              ✕
            </button>
          </div>
        ))}
        <button
          className="add-btn"
          type="button"
          onClick={() => onChange([...value, ""])}
        >
          + Add item
        </button>
      </div>
    </div>
  );
}

// ─── Nav card for nested objects/arrays ──────────────────────────────────────

function NavCard({ fieldKey, value, documentId, fullPath }) {
  const t = typeOf(value);
  const href = navPath(documentId, fullPath);

  return (
    <Link href={href} className="nav-card">
      <div className="nav-card-left">
        <span className="nav-type-badge">{t === "array" ? "[ ]" : "{ }"}</span>
        <div>
          <p className="nav-card-title">{labelFromKey(fieldKey)}</p>
          <p className="nav-card-meta">{typeLabel(value)}</p>
        </div>
      </div>
      <span className="nav-arrow">→</span>
    </Link>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function PropertyDrillEditor({ documentId, fullDocument, path }) {
  const router = useRouter();
  const [, startTransition] = useTransition();

  // Only store the slice of the document we're currently editing.
  // e.g. at path ["salesContact"] this is just { address, telephone, email }
  const [localSection, setLocalSection] = useState(() => getAtPath(fullDocument, path));
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [dirty, setDirty] = useState(false);
  const [error, setError] = useState(null);

  // currentData is always the local slice — no full-doc traversal needed
  const currentData = localSection;

  function handleChange(key, value) {
    setLocalSection((prev) => {
      if (Array.isArray(prev)) {
        const next = [...prev];
        next[key] = value;
        return next;
      }
      return { ...prev, [key]: value };
    });
    setDirty(true);
    setSaved(false);
  }

  // Extract the save logic so handleAppend/handleRemove can call it directly
  // with a known next value (React state updates are async — we can't read
  // localSection immediately after setLocalSection).
  async function persistArray(nextArray) {
    setSaving(true);
    setError(null);
    try {
      const dotKey = path.join(".");
      const setPayload = path.length === 0
        ? nextArray          // root-level primitive array (rare)
        : { [dotKey]: nextArray };

      const res = await fetch(`/api/properties/${documentId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(setPayload),
      });
      if (!res.ok) throw new Error((await res.json()).message ?? "Save failed");
      setSaved(true);
      setDirty(false);
      startTransition(() => router.refresh());
    } catch (e) {
      setError(e.message);
    } finally {
      setSaving(false);
    }
  }

  // Append a clone of the last item (or a blank template), then immediately save.
  // This ensures the new index exists in MongoDB before the user navigates into it.
  async function handleAppend(useBlank = false) {
    const prev = localSection;
    if (!Array.isArray(prev)) return;
    const template = prev.length > 0
      ? (useBlank ? blankFrom(prev[prev.length - 1]) : deepClone(prev[prev.length - 1]))
      : blankFrom({});
    const next = [...prev, template];
    setLocalSection(next);
    setSaved(false);
    await persistArray(next);
  }

  // Remove an item by index, then immediately save.
  async function handleRemoveIndex(index) {
    const prev = localSection;
    if (!Array.isArray(prev)) return;
    const next = prev.filter((_, i) => i !== index);
    setLocalSection(next);
    setSaved(false);
    await persistArray(next);
  }

  async function handleSave() {
    setSaving(true);
    setError(null);
    try {
      let setPayload;

      if (path.length === 0) {
        // Root level: only send leaf-level keys visible on this page.
        // Sending nested objects would overwrite their sub-fields in MongoDB.
        // Strip _id too — MongoDB won't allow updating the immutable _id field.
        setPayload = Object.fromEntries(
          Object.entries(localSection).filter(([key, val]) => {
            if (key === "_id") return false;
            if (isLeaf(val)) return true;
            if (isArrayOfPrimitives(val)) return true;
            return false; // nested objects/arrays → navigate there to edit
          })
        );
      } else {
        // Deep path: send the whole local slice under its dot-notation key.
        // e.g. ["salesContact"] → { "salesContact": { address, telephone, email } }
        // e.g. ["salesContact", "telephone"] → { "salesContact.telephone": [...] }
        const dotKey = path.join(".");
        setPayload = { [dotKey]: localSection };
      }

      const res = await fetch(`/api/properties/${documentId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(setPayload),
      });
      if (!res.ok) throw new Error((await res.json()).message ?? "Save failed");
      setSaved(true);
      setDirty(false);
      startTransition(() => router.refresh());
    } catch (e) {
      setError(e.message);
    } finally {
      setSaving(false);
    }
  }

  // Build breadcrumb segments
  const crumbs = [
    { label: fullDocument.name ?? documentId, href: basePath(documentId) },
    ...path.map((seg, i) => ({
      label: labelFromKey(seg),
      href: navPath(documentId, path.slice(0, i + 1)),
    })),
  ];

  // Classify fields at current level
  let leafFields = [];
  let nestedFields = [];

  // Whether the page root itself is an array of objects (e.g. visiting /rooms)
  const isObjectArray = Array.isArray(currentData) && !isArrayOfPrimitives(currentData);

  if (Array.isArray(currentData)) {
    if (isArrayOfPrimitives(currentData)) {
      // Treat the whole array as one editable unit at this level
      leafFields = [{ key: path[path.length - 1] ?? "items", value: currentData, isArr: true }];
    } else {
      // Array of objects → each index is a nav card; Add/Remove handled separately below
      currentData.forEach((item, i) => {
        if (isLeaf(item)) {
          leafFields.push({ key: String(i), value: item });
        } else {
          nestedFields.push({ key: String(i), value: item, index: i });
        }
      });
    }
  } else if (currentData && typeof currentData === "object") {
    Object.entries(currentData).forEach(([key, val]) => {
      if (isLeaf(val)) {
        leafFields.push({ key, value: val });
      } else if (isArrayOfPrimitives(val)) {
        leafFields.push({ key, value: val, isArr: true });
      } else {
        nestedFields.push({ key, value: val });
      }
    });
  }

  const hasLeafs = leafFields.length > 0;
  const hasNested = nestedFields.length > 0;

  return (
    <>
      <style>{`
        .drill-wrap {
          max-width: 780px;
          margin: 0 auto;
          padding: 32px 24px 80px;
          font-family: 'DM Sans', 'Helvetica Neue', sans-serif;
        }

        /* Breadcrumb */
        .breadcrumb {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 4px;
          margin-bottom: 28px;
        }
        .breadcrumb a {
          font-size: 13px;
          color: var(--color-text-secondary);
          text-decoration: none;
          padding: 3px 8px;
          border-radius: 6px;
          transition: background 0.1s;
        }
        .breadcrumb a:hover { background: var(--color-background-secondary); }
        .breadcrumb-sep { font-size: 13px; color: var(--color-text-secondary); opacity: 0.4; }
        .breadcrumb-current {
          font-size: 13px;
          color: var(--color-text-primary);
          font-weight: 500;
          padding: 3px 8px;
          background: var(--color-background-secondary);
          border-radius: 6px;
        }

        /* Section headings */
        .section-label {
          font-size: 11px;
          letter-spacing: 0.07em;
          text-transform: uppercase;
          color: var(--color-text-secondary);
          font-weight: 600;
          margin: 0 0 12px;
        }

        /* Card that wraps leaf fields */
        .fields-card {
          background: var(--color-background-primary);
          border: 0.5px solid var(--color-border-tertiary);
          border-radius: 12px;
          overflow: hidden;
          margin-bottom: 28px;
        }

        .field-row {
          display: grid;
          grid-template-columns: 180px 1fr;
          gap: 8px 20px;
          align-items: center;
          padding: 13px 20px;
          border-bottom: 0.5px solid var(--color-border-tertiary);
        }
        .field-row:last-child { border-bottom: none; }
        .field-row.align-start { align-items: flex-start; }

        .field-label {
          font-size: 13px;
          font-weight: 500;
          color: var(--color-text-secondary);
          padding-top: 2px;
          word-break: break-word;
        }

        .field-input input[type="text"],
        .field-input input[type="number"],
        .field-input textarea {
          width: 100%;
          box-sizing: border-box;
          padding: 8px 12px;
          font-size: 14px;
          border: 0.5px solid var(--color-border-secondary);
          border-radius: 8px;
          background: var(--color-background-primary);
          color: var(--color-text-primary);
          font-family: inherit;
          outline: none;
          transition: border-color 0.15s;
        }
        .field-input input:focus,
        .field-input textarea:focus {
          border-color: #1D9E75;
          box-shadow: 0 0 0 3px rgba(29,158,117,0.12);
        }
        .field-input textarea { resize: vertical; line-height: 1.6; }

        /* Toggle */
        .toggle {
          width: 46px; height: 26px; border-radius: 13px;
          border: none; cursor: pointer;
          background: var(--color-background-secondary);
          position: relative; transition: background 0.2s;
          flex-shrink: 0;
        }
        .toggle.on { background: #1D9E75; }
        .toggle-knob {
          position: absolute; top: 4px; left: 4px;
          width: 18px; height: 18px; border-radius: 50%;
          background: #fff; transition: left 0.2s;
          box-shadow: 0 1px 3px rgba(0,0,0,0.25);
        }
        .toggle.on .toggle-knob { left: 24px; }

        /* Array of primitives */
        .array-item-row {
          display: flex; gap: 8px; align-items: center; margin-bottom: 7px;
        }
        .array-item-row input { flex: 1; }
        .icon-btn {
          background: none;
          border: 0.5px solid var(--color-border-secondary);
          border-radius: 6px;
          cursor: pointer;
          padding: 6px 10px;
          font-size: 12px;
          color: var(--color-text-secondary);
          transition: all 0.1s;
          flex-shrink: 0;
        }
        .icon-btn.danger:hover { border-color: #D85A30; color: #D85A30; }
        .add-btn {
          background: none;
          border: 0.5px dashed var(--color-border-secondary);
          border-radius: 7px;
          cursor: pointer;
          padding: 6px 12px;
          font-size: 12px;
          color: var(--color-text-secondary);
          width: 100%;
          text-align: left;
          margin-top: 2px;
          transition: border-color 0.15s, color 0.15s;
        }
        .add-btn:hover { border-color: #1D9E75; color: #1D9E75; }

        /* Nav cards */
        .nav-cards-grid {
          display: flex;
          flex-direction: column;
          gap: 8px;
          margin-bottom: 28px;
        }
        .nav-card {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 14px 18px;
          background: var(--color-background-primary);
          border: 0.5px solid var(--color-border-tertiary);
          border-radius: 10px;
          text-decoration: none;
          color: inherit;
          transition: border-color 0.15s, box-shadow 0.15s;
          cursor: pointer;
        }
        .nav-card:hover {
          border-color: #1D9E75;
          box-shadow: 0 0 0 2px rgba(29,158,117,0.1);
        }
        .nav-card-left { display: flex; align-items: center; gap: 14px; }
        .nav-type-badge {
          font-size: 11px;
          font-family: 'DM Mono', 'Fira Code', monospace;
          font-weight: 600;
          color: #1D9E75;
          background: rgba(29,158,117,0.1);
          padding: 4px 8px;
          border-radius: 6px;
          min-width: 34px;
          text-align: center;
          flex-shrink: 0;
        }
        .nav-card-title {
          font-size: 14px; font-weight: 500; margin: 0 0 2px;
          color: var(--color-text-primary);
        }
        .nav-card-meta {
          font-size: 12px; color: var(--color-text-secondary); margin: 0;
        }
        .nav-arrow {
          font-size: 16px; color: var(--color-text-secondary);
          transition: transform 0.15s;
        }
        .nav-card:hover .nav-arrow { transform: translateX(3px); }

        /* Save bar */
        .save-bar {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          gap: 12px;
          padding: 14px 20px;
          background: var(--color-background-primary);
          border: 0.5px solid var(--color-border-tertiary);
          border-radius: 10px;
          margin-top: 8px;
        }
        .status-text { font-size: 13px; }
        .status-text.dirty { color: var(--color-text-secondary); }
        .status-text.saved { color: #1D9E75; }
        .status-text.err { color: #D85A30; }

        .save-btn {
          padding: 8px 22px;
          font-size: 14px;
          font-weight: 500;
          font-family: inherit;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          transition: opacity 0.15s, background 0.15s;
          background: #1D9E75;
          color: #fff;
        }
        .save-btn:disabled {
          background: var(--color-background-secondary);
          color: var(--color-text-secondary);
          cursor: default;
        }

        .page-title {
          font-size: 22px;
          font-weight: 500;
          margin: 0 0 6px;
          color: var(--color-text-primary);
        }
        .page-subtitle {
          font-size: 13px;
          color: var(--color-text-secondary);
          margin: 0 0 28px;
        }

        .divider { margin: 28px 0 20px; border: none; border-top: 0.5px solid var(--color-border-tertiary); }

        /* Array-of-objects: nav card row with remove button */
        .nav-card-row {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .nav-card-row .nav-card { flex: 1; }
        .remove-item-btn {
          flex-shrink: 0;
          background: none;
          border: 0.5px solid var(--color-border-secondary);
          border-radius: 7px;
          cursor: pointer;
          padding: 8px 11px;
          font-size: 12px;
          color: var(--color-text-secondary);
          transition: border-color 0.15s, color 0.15s;
          height: 100%;
        }
        .remove-item-btn:hover { border-color: #D85A30; color: #D85A30; }

        /* Add item bar */
        .add-item-bar {
          display: flex;
          gap: 8px;
          margin-top: 4px;
        }
        .add-item-btn {
          flex: 1;
          padding: 10px 16px;
          font-size: 13px;
          font-family: inherit;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.15s;
          text-align: center;
        }
        .add-item-btn.clone {
          background: rgba(29,158,117,0.07);
          border: 0.5px solid rgba(29,158,117,0.35);
          color: #1D9E75;
        }
        .add-item-btn.clone:hover {
          background: rgba(29,158,117,0.14);
          border-color: #1D9E75;
        }
        .add-item-btn.blank {
          background: var(--color-background-primary);
          border: 0.5px dashed var(--color-border-secondary);
          color: var(--color-text-secondary);
        }
        .add-item-btn.blank:hover {
          border-color: var(--color-border-primary);
          color: var(--color-text-primary);
        }
      `}</style>

      <div className="drill-wrap">

        {/* Breadcrumb */}
        <nav className="breadcrumb">
          {crumbs.map((c, i) => (
            <span key={i} style={{ display: "flex", alignItems: "center", gap: 4 }}>
              {i > 0 && <span className="breadcrumb-sep">/</span>}
              {i < crumbs.length - 1 ? (
                <Link href={c.href}>{c.label}</Link>
              ) : (
                <span className="breadcrumb-current">{c.label}</span>
              )}
            </span>
          ))}
        </nav>

        {/* Page title */}
        <h1 className="page-title">
          {path.length === 0 ? "Edit Property" : labelFromKey(path[path.length - 1])}
        </h1>
        {path.length === 0 && (
          <p className="page-subtitle">
            {fullDocument.location ?? ""}
          </p>
        )}

        {/* ── Editable leaf fields ── */}
        {hasLeafs && (
          <>
            {hasNested && <p className="section-label">Editable fields</p>}
            <div className="fields-card">
              {leafFields.map(({ key, value, isArr }) =>
                isArr ? (
                  <PrimitiveArrayEditor
                    key={key}
                    fieldKey={key}
                    value={value}
                    onChange={(next) => handleChange(key, next)}
                  />
                ) : (
                  <LeafEditor
                    key={key}
                    fieldKey={key}
                    value={value}
                    onChange={(next) => handleChange(key, next)}
                  />
                )
              )}
            </div>
          </>
        )}

        {/* ── Save bar (only shown if there are editable fields) ── */}
        {hasLeafs && (
          <div className="save-bar">
            {error && <span className="status-text err">{error}</span>}
            {saved && !dirty && <span className="status-text saved">✓ Saved</span>}
            {dirty && <span className="status-text dirty">Unsaved changes</span>}
            <button
              className="save-btn"
              onClick={handleSave}
              disabled={!dirty || saving}
            >
              {saving ? "Saving…" : "Save changes"}
            </button>
          </div>
        )}

        {/* ── Nested nav cards ── */}
        {hasNested && (
          <>
            {hasLeafs && <hr className="divider" />}
            <p className="section-label">
              {isObjectArray ? `Items (${nestedFields.length})` : "Nested sections"}
            </p>
            <div className="nav-cards-grid">
              {nestedFields.map(({ key, value, index }) => (
                <div key={key} className="nav-card-row">
                  <NavCard
                    fieldKey={isObjectArray ? `Item ${Number(key) + 1}` : key}
                    value={value}
                    documentId={documentId}
                    fullPath={[...path, key]}
                  />
                  {isObjectArray && (
                    <button
                      className="remove-item-btn"
                      type="button"
                      title="Remove this item"
                      onClick={() => handleRemoveIndex(index ?? Number(key))}
                    >
                      ✕
                    </button>
                  )}
                </div>
              ))}
            </div>

            {/* Add buttons — only for array-of-objects pages */}
            {isObjectArray && (
              <div className="add-item-bar">
                <button
                  className="add-item-btn clone"
                  type="button"
                  disabled={saving}
                  onClick={() => handleAppend(false)}
                >
                  {saving ? "Saving…" : "+ Clone last item"}
                </button>
                <button
                  className="add-item-btn blank"
                  type="button"
                  disabled={saving}
                  onClick={() => handleAppend(true)}
                >
                  {saving ? "Saving…" : "+ Add blank item"}
                </button>
              </div>
            )}
          </>
        )}

        {/* Empty array — show add buttons even when there are no items */}
        {isObjectArray && !hasNested && !hasLeafs && (
          <div className="add-item-bar">
            <button
              className="add-item-btn blank"
              type="button"
              disabled={saving}
              onClick={() => handleAppend(true)}
            >
              {saving ? "Saving…" : "+ Add first item"}
            </button>
          </div>
        )}

        {/* Saving indicator for array mutations (no leaf save bar visible on pure-array pages) */}
        {isObjectArray && error && (
          <p style={{ fontSize: 13, color: "#D85A30", marginTop: 8 }}>{error}</p>
        )}
        {isObjectArray && saved && !dirty && (
          <p style={{ fontSize: 13, color: "#1D9E75", marginTop: 8 }}>✓ Saved</p>
        )}
      </div>
    </>
  );
}