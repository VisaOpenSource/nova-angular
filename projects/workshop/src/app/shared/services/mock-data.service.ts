/**
 *              © 2025-2026 Visa
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *         http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 **/
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export const MockDataKeys: Record<string, string> = {
  getAgriProduce: 'agri-produce',
  getHeroes: 'heroes',
  getLargeData: 'large-data-set'
};

export type MockDataKey = keyof typeof MockDataKeys;

type Hero = {
  name: string;
  label: string;
  value: string;
};
@Injectable({
  providedIn: 'root'
})
export class MockDataService {
  private readonly http = inject(HttpClient);

  public getAgriProduce(): Observable<any> {
    return this.http.get(`./mock-data/agri-produce.json`);
  }

  public getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(`./mock-data/heroes.json`);
  }

  // large data set taken from https://github.com/json-iterator/test-data/blob/master/large-file.json
  public getLargeData(): Observable<any> {
    return this.http.get(`./mock-data/large-data-set.json`);
  }
}
