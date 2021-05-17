var http = require('http');
var fs = require('fs');

var formidable = require('formidable'); // module này để lấy thông tin từ form
const excelToJson = require('convert-excel-to-json');
var ejs = require('ejs');

var Port = normalizePort(process.env.PORT || 1000);
var Dich_vu = http.createServer(async function(req, res) {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    var receivedString = "";
    req.on('data', (chunk) => { receivedString += chunk; }); // nhận dữ liệu từ client gửi lên
    // console.log(receivedString);
    //Nếu request là uplooad và method là post
    console.log(req.url);

    if (req.url === '/upload') {
        var data = [];
        var ly;
        var title;
        var form = new formidable.IncomingForm();
        form.uploadDir = "excels/";
        form.parse(req, function(err, fields, file) {
            var path = file.calendar.path;
            var result = excelToJson({
                source: fs.readFileSync(path),
                // source: fs.readFileSync(form.uploadDir + file.paticipantlist.name),
                columnToKey: {
                    A: 'kichco',
                    B: 'nuocmau',
                    C: 'dosach',
                    D: 'gia',
                    E: 'maso',
                    F: 'ly',
                    G: 'title'
                }
            })
            result = result.Sheet1;
            result.shift();
            var i = 0;
            var delay = async() => {
                result.forEach(element => {
                    data.push(element);
                    if (i == 0) {
                        ly = element.ly;
                        title = element.title;
                    }
                    i++;
                })
            };
            delay().then(async() => {
                console.log(data);
                fs.readFile('index.ejs', 'utf-8', function(err, content) {
                    if (err) {
                        res.end('error occurred');
                        return;
                    }
                    console.log(ly);
                    console.log(title);
                    var renderedHtml = ejs.render(content, { datas: data, ly: ly, title: title }); //get redered HTML code
                    res.end(renderedHtml);
                });
            });

        });

        return;
    }

    req.on('end', async() => {
        fs.readFile('views/upload.ejs', 'utf-8', function(err, content) {
            if (err) {
                res.end('error occurred');
                return;
            }
            var renderedHtml = ejs.render(content); //get redered HTML code
            res.end(renderedHtml);
        });
        return;
    })

});
Dich_vu.listen(Port, console.log(`Dịch vụ Dữ liệu đang thực thi tại địa chỉ: http://localhost:${Port}`));
Dich_vu.on('error', onError);
Dich_vu.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */
function normalizePort(val) {
    var port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
}
/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    var bind = typeof Port === 'string' ?
        'Pipe ' + Port :
        'Port ' + Port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

/**
 * Event listener for HTTP server "listening" event.
 */
function onListening() {
    var addr = Dich_vu.address();
    var bind = typeof addr === 'string' ?
        'pipe ' + addr :
        'port ' + addr.port;
    console.log('Listening on ' + bind);
}