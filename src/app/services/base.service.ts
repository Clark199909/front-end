import { HttpClient, HttpHeaders } from '@angular/common/http';

export class Base {
    get_del_headers: HttpHeaders;
    post_put_headers: HttpHeaders;

    constructor() {
        this.get_del_headers = new HttpHeaders();
        this.post_put_headers = new HttpHeaders();

        if (sessionStorage.getItem("uid") != null) {
            this.get_del_headers = this.get_del_headers.set("Uid", sessionStorage.getItem("uid") || "");
            this.post_put_headers = this.post_put_headers.set("Uid", sessionStorage.getItem("uid") || "");
        }
        this.post_put_headers = this.post_put_headers.set("content-type", "application/json");
    }
}