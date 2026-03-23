import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { ApiResponse, TaskType } from "@core/models/models";
import { environment } from "@env/environment";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class TaskTypeService {
    private readonly http = inject(HttpClient);
    private readonly apiUrl = `${environment.apiUrl}/task-types`;

    public getAll(): Observable<ApiResponse<TaskType[]>> {
        return this.http.get<ApiResponse<TaskType[]>>(this.apiUrl);
    }
}