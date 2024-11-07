// This file is for the Web Worker logic
self.onmessage = async (event) => {
    try {
      const response = await fetch(event.data);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
  
      const rawData = await response.text();
      const lines = rawData.split('\n').filter(line => !line.startsWith('#'));
      const [header, ...dataRows] = lines;
      const fields = header.split('\t');
      const jsonData = dataRows.map(row => {
        const values = row.split('\t');
        return fields.reduce((acc, field, index) => {
          acc[field] = values[index];
          return acc;
        }, {});
      });
  
      // Send the processed data back to the main thread
      self.postMessage(jsonData);
    } catch (error) {
      self.postMessage({ error: error.message });
    }
  };
  