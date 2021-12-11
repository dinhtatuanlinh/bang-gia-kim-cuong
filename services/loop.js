module.exports = async (e) => {
    let result ={};
    result.data = []
    for (j = 0; j < e.length; j++) {
        result.data.push(e[j]);
        if (j === 0) {
            result.ly = e[j].ly;
            result.title = e[j].title;
        }
    }
    return result;
};
