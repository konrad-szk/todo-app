import {inject, InjectionToken} from "@angular/core";
import {TodoistApi} from "@doist/todoist-api-typescript";
import {TODOIST_API_KEY} from "./todoist-api-key.config";

export const TODOIST = new InjectionToken<TodoistApi>('TODOIST', {
  providedIn: "any",
  factory: () => new TodoistApi(inject(TODOIST_API_KEY))
});

