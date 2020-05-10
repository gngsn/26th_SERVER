let postData = [
    {
        idx: 0,
        author: 'gngsn',
        title: '안녕하세요 ~',
        content: '안녕하세요 ~ 테스트임다',
        created_at: '2020-05-10'
    },
    {
        idx: 1,
        title: '안녕하세요11 ~',
        author: 'gyeong',
        content: '안녕하세요 11~ 테스트임다',
        created_at: '2020-05-10'
    },
    {
        idx: 2,
        "title": "postman",
        "author": "gyeongseon",
        "content": "postman test~",
        created_at: '2020-05-10'
    },
];

const post = {
    findAll: async () => {
        return postData;
    },
    find: async (idx) => {
        return postData.filter(post => post.idx == idx);
    },
    write: async (author, title, content, created_at) => {
        const last = postData.length - 1;
        const idx = postData[last].idx + 1;
        const dao = {
            idx,
            author,
            title,
            content,
            created_at
        }
        postData.push(dao);
        return idx;
    },
    update: async (idx, dao) => {
        for(key in dao) {
            if (dao[key] !== undefined) {
                postData[idx][`${key}`] = dao[key];
            }
        }
        return postData[idx];
    },
    delete: async (idx) => {
        postData.splice(idx);
        return true;
    },
}

module.exports = post;
