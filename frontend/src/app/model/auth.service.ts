import { Injectable } from "@angular/core";
import { RestDataSource } from "./rest.datasource";

@Injectable()
export class AuthService {
    constructor(private datasource: RestDataSource) { }
    
    authenticate(username: string, password: string): any {
        return this.datasource.authenticate(username, password);
    }
    
    get authenticated(): boolean {
        return this.datasource.auth_token != null;
    }

    get authToken(): string {
        return this.datasource.auth_token ? this.datasource.auth_token : '';
    }
    
    clear() {
        this.datasource.auth_token = null;
    }
}