// utils/fetchWaterData.js
export const fetchWaterData = async () => {
    const response = await fetch('https://nwis.waterservices.usgs.gov/nwis/iv/?sites=10312100&agencyCd=USGS&startDT=2023-11-08T10:08:41.209-08:00&endDT=2024-11-07T10:08:41.209-08:00&parameterCd=00054&format=rdb');
    
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    
    const rawData = await response.text();
    
    // Filter out comment lines and convert the data to JSON format
    const lines = rawData.split('\n').filter(line => !line.startsWith('#'));
    
    // Extract the header (field names) and data rows
    const [header, ...dataRows] = lines;
    const fields = header.split('\t');
    
    const jsonData = dataRows.map(row => {
      const values = row.split('\t');
      return fields.reduce((acc: { [key: string]: any }, field, index) => {
        acc[field] = values[index];
        return acc;
      }, {});
    });
  
    return jsonData;
  };
  