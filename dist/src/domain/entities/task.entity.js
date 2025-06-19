"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Task = void 0;
const node_crypto_1 = require("node:crypto");
class Task {
    id;
    name;
    status;
    dependencies;
    createdAt;
    updatedAt;
    constructor(props) {
        Object.assign(this, props);
    }
    static create(name, dependencies = []) {
        return new Task({
            id: (0, node_crypto_1.randomUUID)(),
            name: name,
            status: 'pendente',
            dependencies: dependencies,
            createdAt: new Date(),
            updatedAt: new Date(),
        });
    }
    static restore(id, name, status, dependencies, createdAt, updatedAt) {
        return new Task({
            id,
            name,
            status,
            dependencies,
            createdAt,
            updatedAt,
        });
    }
}
exports.Task = Task;
//# sourceMappingURL=task.entity.js.map