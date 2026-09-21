export function createResponse() {
    return {
        badRequest: (res, message) => {
            return res.status(400).json({ error: message });
        },
        unauthorized: (res, message) => {
            return res.status(401).json({ error: message })
        },
        forbidden: (res, message) => {
            return res.status(403).json({ error: message })
        },
        ok: (res, data) => {
            return res.status(200).json(data);
        },
        created: (res, data) => {
            return res.status(201).json(data);
        },
        updated: (res, data) => {
            return res.status(200).json(data);
        },
        notFound: (res, message) => {
            return res.status(404).json({ error: message });
        }
    }; 
};
