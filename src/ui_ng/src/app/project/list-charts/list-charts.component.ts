import { Project } from '../../project/project';
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from '@angular/router';

import { SessionService } from './../../shared/session.service';
import { SessionUser } from './../../shared/session-user';


@Component({
  selector: "project-list-charts",
  templateUrl: "./list-charts.component.html",
  styleUrls: ["./list-charts.component.scss"]
})
export class ListChartsComponent implements OnInit {
  projectId: number;

  projectName: string;
  urlPrefix: string;
  hasSignedIn: boolean;
  hasProjectAdminRole: boolean;
  currentUser: SessionUser;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private session: SessionService) {}

  ngOnInit() {
    // Get projectId from route params snapshot.
    this.projectId = +this.route.snapshot.parent.params["id"];
    // Get current user from registered resolver.
    this.currentUser = this.session.getCurrentUser();
    let resolverData = this.route.snapshot.parent.data;
    if (resolverData) {
      let project = <Project>(resolverData["projectResolver"]);
      this.projectName = project.name;
      this.hasProjectAdminRole = project.has_project_admin_role;
    }
  }

  onChartClick(chartName: string) {
    this.router.navigateByUrl(`${this.router.url}/${chartName}/versions`);
  }
}
