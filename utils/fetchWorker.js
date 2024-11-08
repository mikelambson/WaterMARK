self.onmessage = async (event) => {
  try {
    const response = await fetch(event.data);
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }

    const rawData = await response.text();
    const lines = rawData.split('\n').filter(line => !line.startsWith('#') && line.trim() !== '');

    // Split the data into header and data rows
    const [header, ...dataRows] = lines;
    if (!header || dataRows.length === 0) {
      throw new Error('No data rows available');
    }

    const fields = header.split('\t');

    // Convert the rows into JSON format with only `datetime` and `af`
    const parsedData = dataRows.slice(1).map(row => {
      const values = row.split('\t');
      const rowData = fields.reduce((acc, field, index) => {
        acc[field] = values[index];
        return acc;
      }, {});

      // Extract only datetime and af fields
      return {
        datetime: rowData['datetime'],
        af: parseFloat(rowData['103934_00054']) || 0 // Ensure af is a number
      };
    });

    // Group data by day and calculate the average af for each day
    const dailyData = {};
    parsedData.forEach(({ datetime, af }) => {
      const date = datetime.split(' ')[0]; // Extract date part (YYYY-MM-DD)
      if (!dailyData[date]) {
        dailyData[date] = { totalAf: 0, count: 0 };
      }
      dailyData[date].totalAf += af;
      dailyData[date].count += 1;
    });

    const averagedData = Object.entries(dailyData).map(([date, { totalAf, count }]) => ({
      datetime: date,
      af: Math.round(totalAf / count) // Calculate average af for the day
    }));

    // Send the processed data back to the main thread
    self.postMessage(averagedData);
  } catch (error) {
    self.postMessage({ error: error.message });
  }
};
