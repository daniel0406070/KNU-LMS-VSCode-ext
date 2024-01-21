"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require('fs');
const jsonfile = fs.readFileSync("../token.json");
const Token_Json = JSON.parse(jsonfile);
const API_URL = "https://canvas.knu.ac.kr";
const API_TOKEN = Token_Json["token"];
class LMS_API {
    constructor() {
    }
    direct_request(method) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = `${API_URL}/api/v1/${method}?access_token=${API_TOKEN}`;
            const responce = yield fetch(url);
            const json = yield responce.json();
            return json;
        });
    }
    get_courses() {
        return this.direct_request("courses");
    }
    get_course(course_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const new_course = new Course(course_id);
            yield new_course.course_init(course_id);
            return new_course;
        });
    }
}
class Course {
    constructor(id) {
        this.api = new LMS_API;
        this.id = id;
        this.name = null;
    }
    course_init(course_id) {
        return __awaiter(this, void 0, void 0, function* () {
            this.api.direct_request(`courses/${course_id}`).then((json) => {
                this.id = json["id"];
                this.name = json["name"];
            })
                .catch((error) => {
                console.log(error);
            });
        });
    }
    get_assignments() {
        return this.api.direct_request(`courses/${this.id}/assignments`);
    }
    get_assignment(assignment_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const new_assignment = new assignment(assignment_id);
            yield new_assignment.assignment_init(assignment_id);
            return new_assignment;
        });
    }
}
class assignment {
    constructor(id) {
        this.api = new LMS_API;
        this.id = null;
        this.name = null;
        this.description = null;
        this.due_at = null; //마감 기한 (지나도 제출은 가능)
        this.unlock_at = null; //제출 시작 시간
        this.lock_at = null; //제출 마감 시간 (지나면 제출 막힘)
        this.html_url = null; //과제 링크
        this.locked_for_user = null; //제출 가능 여부
    }
    assignment_init(assignment_id) {
        return __awaiter(this, void 0, void 0, function* () {
            this.api.direct_request(`assignments/${assignment_id}`).then((json) => {
                if (json != null) {
                    this.id = json["id"];
                    this.name = json["name"];
                    this.description = json["description"];
                    this.due_at = json["due_at"];
                    this.unlock_at = json["unlock_at"];
                    this.lock_at = json["lock_at"];
                    this.html_url = json["html_url"];
                    this.locked_for_user = json["locked_for_user"];
                }
            });
        });
    }
}
class discussion_topics {
    constructor(id) {
        this.api = new LMS_API;
        this.id = null;
        this.title = null;
        this.message = null;
        this.html_url = null; //과제 링크
        this.locked_for_user = null; //제출 가능 여부
    }
    discussion_topics_init(discussion_topics_id) {
        return __awaiter(this, void 0, void 0, function* () {
            this.api.direct_request(`discussion_topics/${discussion_topics_id}`).then((json) => {
                if (json != null) {
                    this.id = json["id"];
                    this.title = json["title"];
                    this.message = json["message"];
                    this.html_url = json["html_url"];
                    this.locked_for_user = json["locked_for_user"];
                }
            });
        });
    }
}
const lms = new LMS_API;
const course = lms.get_course(24579).then((course) => {
    console.log(course);
});
//# sourceMappingURL=test.js.map