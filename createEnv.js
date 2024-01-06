const fs = require('fs');

const fileName = '.env.local';
const scriptContents = `#### Local Evironment Settings ####

#API port address
API_ADDRESS=http://localhost:8080
NEXT_PUBLIC_API_BASE_URL=\${API_ADDRESS}/api/
`;

fs.access(fileName, fs.constants.F_OK, (err) => {
  if (err) {
    // File doesn't exist, create and write script contents
    fs.writeFileSync(fileName, scriptContents);
    console.log(`${fileName} created with contents:\n${scriptContents}`);
  } else {
    console.log(`${fileName} already exists.`);
  }
});