import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { BlackListPolicy } from 'src/app/core/interfaces/blackListPolicy';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BlackListPolicyService {
  private readonly entryPoint: string;

  constructor(private http: HttpClient) {
    this.entryPoint = `${environment.serverEntryPointURL}/blacklist-policy.json`;
  }

  all(query?: { blackListIds?: string[] }): Observable<BlackListPolicy[]> {
    return this.http.get<BlackListPolicy[]>(`${this.entryPoint}`).pipe(
      map((res) => {
        // simulates filtering from server
        return !Array.isArray(query?.blackListIds)
          ? res
          : res.filter((item) => query?.blackListIds!.includes(item.itemId));
      })
    );
  }
}
