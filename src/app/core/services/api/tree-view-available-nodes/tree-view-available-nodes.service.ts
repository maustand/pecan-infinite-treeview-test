import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { TreeViewAvailableNode } from 'src/app/core/interfaces/treeViewAvailableNode';
import { filter, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TreeViewAvailableNodesService {
  private readonly entryPoint: string;

  constructor(private http: HttpClient) {
    this.entryPoint = `${environment.serverEntryPointURL}/treeview-available-nodes.json`;
  }

  all(query?: {
    parentId?: string;
    type?: string;
  }): Observable<TreeViewAvailableNode[]> {
    return this.http.get<TreeViewAvailableNode[]>(`${this.entryPoint}`).pipe(
      /*  MAP simulates queryparams GET: /treeview-available-nodes?q=parentId=20..
          DOES NOT intend to be a real world filter. Filtered data should come from server
       */
      map((res) =>
        res.filter((item) => {
          return item.parentId === query?.parentId || item.type === query?.type;
        })
      )
    );
  }
}
