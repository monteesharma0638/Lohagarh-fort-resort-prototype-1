export default function LocationWidget({mapUrl}: {mapUrl: string}) {
  return (
    <iframe 
        src={mapUrl} 
        width="600" 
        height="450" 
        style={{border: 0}}  
        loading="lazy" 
        referrerPolicy="no-referrer-when-downgrade"
    ></iframe>
  );
}