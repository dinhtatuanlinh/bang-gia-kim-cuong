module.exports = async (e) => {
    let result ={};
    result.data = []
    for (i = 0; i < e.length; i++) {
        result.data.push(e[i]);
        if (i === 0) {
            result.ly = e[i].ly;
            result.title = e[i].title;
        }
    }
    return result;
};
