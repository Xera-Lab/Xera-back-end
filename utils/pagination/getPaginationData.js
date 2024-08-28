
const getPaginationData = (count, page, size) => {
    var nextPage = Number(page || 1) + 1;
    var prevPage = (page || 1) - 1;

    if (((page || count) * (size || count)) > count) {
        nextPage = null;
    }

    if (prevPage === 0) {
        prevPage = null;
    }

    return {
        total: count,
        nextPage: nextPage,
        prevPage: prevPage,
    };
};

module.exports = { getPaginationData };