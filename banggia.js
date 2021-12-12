var http = require("http");
var fs = require("fs");

var formidable = require("formidable"); // module này để lấy thông tin từ form
const excelToJson = require("convert-excel-to-json");
var ejs = require("ejs");

const loop = require("./services/loop");
var Port = normalizePort(process.env.PORT || 8988);
var Dich_vu = http.createServer(async function (req, res) {
    res.writeHead(200, { "Content-Type": "text/html" });
    var receivedString = "";
    req.on("data", (chunk) => {
        receivedString += chunk;
    }); // nhận dữ liệu từ client gửi lên
    // console.log(receivedString);
    //Nếu request là uplooad và method là post

    if (req.url === "/deleteexcel") {
        await fs.rmSync("./excels", { recursive: true });
        res.end('fasdf');
    }
    if (req.url === "/si") {
        var datas = [];

        var form = new formidable.IncomingForm();
        form.uploadDir = "excels/";
        form.parse(req, async (err, fields, file) => {
            var path = file.calendar.path;
            var result = excelToJson({
                source: fs.readFileSync(path),
                // source: fs.readFileSync(form.uploadDir + file.paticipantlist.name),
                columnToKey: {
                    A: "kichco",
                    B: "nuocmau",
                    C: "dosach",
                    D: "gia",
                    E: "maso",
                    F: "ly",
                    G: "title",
                },
            });

            result = Object.values(result);
            for (i = 0; i < result.length; i++) {
                let a = result[i];
                a.shift();
                let data = await loop(a);
                datas.push(data);
            }
            // result.forEach((e) => {
            //     // console.log(e);
            //     var i = 0;
            //     e.shift();
            //     e.forEach((element) => {
            //         data.data.push(element);
            //         if (i == 0) {
            //             data.ly = element.ly;
            //             data.title = element.title;
            //         }
            //         i++;
            //     });
            //     console.log(data);
            //     datas.push(data);
            // });

            fs.readFile("si.ejs", "utf-8", function (err, content) {
                if (err) {
                    res.end("error occurred");
                    return;
                }
                var renderedHtml = ejs.render(content, { datas }); //get redered HTML code
                res.end(renderedHtml);
            });
        });

        return;
    }
    if (req.url === "/le") {
        var datas = [];

        var form = new formidable.IncomingForm();
        form.uploadDir = "excels/";
        form.parse(req, async (err, fields, file) => {
            var path = file.calendar.path;
            var result = excelToJson({
                source: fs.readFileSync(path),
                // source: fs.readFileSync(form.uploadDir + file.paticipantlist.name),
                columnToKey: {
                    A: "kichco",
                    B: "nuocmau",
                    C: "dosach",
                    D: "gia",
                    E: "maso",
                    F: "ly",
                    G: "title",
                },
            });

            result = Object.values(result);
            for (i = 0; i < result.length; i++) {
                let a = result[i];
                a.shift();
                let data = await loop(a);
                datas.push(data);
            }
            // result.forEach((e) => {
            //     // console.log(e);
            //     var i = 0;
            //     e.shift();
            //     e.forEach((element) => {
            //         data.data.push(element);
            //         if (i == 0) {
            //             data.ly = element.ly;
            //             data.title = element.title;
            //         }
            //         i++;
            //     });
            //     console.log(data);
            //     datas.push(data);
            // });

            fs.readFile("le.ejs", "utf-8", function (err, content) {
                if (err) {
                    res.end("error occurred");
                    return;
                }
                var renderedHtml = ejs.render(content, { datas }); //get redered HTML code
                res.end(renderedHtml);
            });
        });

        return;
    }
    if (req.url === "/upload-vang") {
        var data = [];
        var shape;
        var form = new formidable.IncomingForm();
        form.uploadDir = "excels/";
        form.parse(req, function (err, fields, file) {
            var path = file.calendar.path;
            var result = excelToJson({
                source: fs.readFileSync(path),
                // source: fs.readFileSync(form.uploadDir + file.paticipantlist.name),
                columnToKey: {
                    A: "ly",
                    B: "nuocmau",
                    C: "dosach",
                    D: "price",
                    E: "gia",
                    F: "title",
                },
            });
            result = result.Sheet1;
            result.shift();
            var i = 0;
            var delay = async () => {
                result.forEach((element) => {
                    data.push(element);
                    if (i == 0) {
                        shape = element.title;
                    }
                    i++;
                });
            };
            delay().then(async () => {
                fs.readFile(
                    "kimcuongvang.ejs",
                    "utf-8",
                    function (err, content) {
                        if (err) {
                            res.end("error occurred");
                            return;
                        }
                        var renderedHtml = ejs.render(content, {
                            datas: data,
                            shape: shape,
                        }); //get redered HTML code
                        res.end(renderedHtml);
                    }
                );
            });
        });

        return;
    }
    if (req.url === "/moissanite") {
        var data = [];
        var ly;
        var title;
        var form = new formidable.IncomingForm();
        form.uploadDir = "excels/";
        form.parse(req, function (err, fields, file) {
            var path = file.calendar.path;
            var result = excelToJson({
                source: fs.readFileSync(path),
                // source: fs.readFileSync(form.uploadDir + file.paticipantlist.name),
                columnToKey: {
                    A: "ly",
                    B: "carat",
                    C: "trang",
                    D: "xanh",
                    E: "vang",
                    F: "name",
                },
            });
            result = result.Sheet1;
            result.shift();
            var i = 0;
            var delay = async () => {
                result.forEach((element) => {
                    data.push(element);
                    if (i == 0) {
                        shape = element.name;
                    }
                    i++;
                });
            };
            delay().then(async () => {
                fs.readFile("moissanite.ejs", "utf-8", function (err, content) {
                    if (err) {
                        res.end("error occurred");
                        return;
                    }

                    var renderedHtml = ejs.render(content, {
                        datas: data,
                        shape: shape,
                    }); //get redered HTML code
                    res.end(renderedHtml);
                });
            });
        });

        return;
    }
    if (req.url === "/fancy") {
        var data = [];
        var shape;
        var form = new formidable.IncomingForm();
        form.uploadDir = "excels/";
        form.parse(req, function (err, fields, file) {
            var path = file.calendar.path;
            var result = excelToJson({
                source: fs.readFileSync(path),
                // source: fs.readFileSync(form.uploadDir + file.paticipantlist.name),
                columnToKey: {
                    A: "ly",
                    B: "nuocmau",
                    C: "dosach",
                    D: "price",
                    E: "gia",
                    F: "title",
                },
            });
            result = result.Sheet1;
            result.shift();
            var i = 0;
            var delay = async () => {
                result.forEach((element) => {
                    data.push(element);
                    if (i == 0) {
                        shape = element.title;
                    }
                    i++;
                });
            };
            delay().then(async () => {
                fs.readFile("fancy.ejs", "utf-8", function (err, content) {
                    if (err) {
                        res.end("error occurred");
                        return;
                    }
                    var renderedHtml = ejs.render(content, {
                        datas: data,
                        shape: shape,
                    }); //get redered HTML code
                    res.end(renderedHtml);
                });
            });
        });

        return;
    }
    req.on("end", async () => {
        fs.readFile("views/upload.ejs", "utf-8", function (err, content) {
            if (err) {
                res.end("error occurred");
                return;
            }
            var renderedHtml = ejs.render(content); //get redered HTML code
            res.end(renderedHtml);
        });
        return;
    });
});
Dich_vu.listen(
    Port,
    console.log(
        `Dịch vụ Dữ liệu đang thực thi tại địa chỉ: http://localhost:${Port}`
    )
);
Dich_vu.on("error", onError);
Dich_vu.on("listening", onListening);

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
    if (error.syscall !== "listen") {
        throw error;
    }

    var bind = typeof Port === "string" ? "Pipe " + Port : "Port " + Port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case "EACCES":
            console.error(bind + " requires elevated privileges");
            process.exit(1);
            break;
        case "EADDRINUSE":
            console.error(bind + " is already in use");
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
    var bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
    console.log("Listening on " + bind);
}
