"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class User {
    constructor(user) {
        // this.id = user._id;
        this.email = user.email;
        this.password = user.password;
        this.cargo = user.cargo || 'cliente';
    }
    // setId(id: number): void {
    //   this.id = id;
    // }
    // getId(): number | undefined {
    //   if (this.id) return this.id;
    //   return undefined;
    // }
    getEmail() {
        return this.email;
    }
    getPassword() {
        return this.password;
    }
    getCargo() {
        return this.cargo;
    }
    setEmail(email) {
        this.email = email;
    }
    setPassword(password) {
        this.password = password;
    }
    setCargo(cargo) {
        this.cargo = cargo;
    }
}
exports.default = User;
//# sourceMappingURL=User.js.map