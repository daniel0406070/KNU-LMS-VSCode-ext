"use strict";
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
        const url = `${API_URL}/api/v1/${method}?access_token=${API_TOKEN}`;
        fetch(url)
            .then((response) => response.json())
            .then((json) => {
            console.log(json);
            return json;
        })
            .catch((error) => {
            console.log(error);
            return null;
        });
    }
    get_courses() {
        return this.direct_request("courses");
    }
    get_course(course_id) {
        return new Course(course_id);
    }
}
class Course {
    constructor(id) {
        this.api = new LMS_API;
        this.id = id;
        this.name = null;
        this.course_init(id);
    }
    course_init(course_id) {
        const course_info = this.api.get_course(course_id);
        if (course_info != null) {
            this.id = course_info["id"];
            this.name = course_info["name"];
        }
    }
    get_assignments() {
        return this.api.direct_request(`courses/${this.id}/assignments`);
    }
    get_assignment(assignment_id) {
        return new assignment(assignment_id);
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
        this.assignment_init(id);
    }
    assignment_init(assignment_id) {
        const assignment_info = this.api.direct_request(`assignments/${assignment_id}`);
        if (assignment_info != null) {
            this.id = assignment_info["id"];
            this.name = assignment_info["name"];
            this.description = assignment_info["description"];
            this.due_at = assignment_info["due_at"];
            this.unlock_at = assignment_info["unlock_at"];
            this.lock_at = assignment_info["lock_at"];
            this.html_url = assignment_info["html_url"];
            this.locked_for_user = assignment_info["locked_for_user"];
        }
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
        this.discussion_topics_init(id);
    }
    discussion_topics_init(discussion_topics_id) {
        const discussion_topics_info = this.api.direct_request(`discussion_topics/${discussion_topics_id}`);
        if (discussion_topics_info != null) {
            this.id = discussion_topics_info["id"];
            this.title = discussion_topics_info["title"];
            this.message = discussion_topics_info["message"];
            this.html_url = discussion_topics_info["html_url"];
            this.locked_for_user = discussion_topics_info["locked_for_user"];
        }
    }
}
const lms = new LMS_API;
const courses = lms.get_courses();
console.log(courses);
//# sourceMappingURL=test.js.map