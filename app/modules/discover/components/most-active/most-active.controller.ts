/*
 * Copyright (C) 2014-2015 Taiga Agile LLC <taiga@taiga.io>
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 *
 * File: most-active.controller.coffee
 */

import {defineImmutableProperty} from "../../../../libs/utils"
import * as angular from "angular"


export class MostActiveController {
    discoverProjectsService:any
    currentOrderBy:any
    order_by:any
    loading:boolean

    static initClass() {
        this.$inject = [
            "tgDiscoverProjectsService"
        ];
    }

    constructor(discoverProjectsService) {
        this.discoverProjectsService = discoverProjectsService;
        defineImmutableProperty(this, "highlighted", () => { return this.discoverProjectsService.mostActive; });

        this.currentOrderBy = 'week';
        this.order_by = this.getOrderBy();
    }

    fetch() {
        this.loading = true;
        this.order_by = this.getOrderBy();

        return this.discoverProjectsService.fetchMostActive({order_by: this.order_by}).then(() => {
            return this.loading = false;
        });
    }

    orderBy(type) {
        this.currentOrderBy = type;

        return this.fetch();
    }

    getOrderBy() {
        if (this.currentOrderBy === 'all') {
            return '-total_activity';
        } else {
            return `-total_activity_last_${this.currentOrderBy}`;
        }
    }
}
MostActiveController.initClass();