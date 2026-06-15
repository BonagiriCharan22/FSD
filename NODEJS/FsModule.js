const fs = require('fs/promises');
async function fileOperations() {
    try {
        await fs.writeFile('sample.txt','Hello from Node.js using async/await!');
        console.log('File written successfully');
        const data = await fs.readFile('sample.txt','utf8');
        console.log('File content:');
        console.log(data);
    } catch (error) {
        console.log('Error:', error.message);
    }
}
fileOperations();