import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { ApiResponse, CreateTask, Task, UpdateTask } from "@core/models/models";
import { environment } from "@env/environment";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class TaskService {
    private readonly http = inject(HttpClient);
    private readonly apiUrl = `${environment.apiUrl}/tasks`;

    public getAll(): Observable<ApiResponse<Task[]>> {
        return this.http.get<ApiResponse<Task[]>>(this.apiUrl);
    }

    public create(data: CreateTask): Observable<ApiResponse<Task>> {
        return this.http.post<ApiResponse<Task>>(this.apiUrl, data);
    }

    public update(id: string, data: UpdateTask): Observable<ApiResponse<Task>> {
        return this.http.put<ApiResponse<Task>>(`${this.apiUrl}/${id}`, data);
    }

    public delete(id: string): Observable<ApiResponse<null>> {
        return this.http.delete<ApiResponse<null>>(`${this.apiUrl}/${id}`);
    }
}