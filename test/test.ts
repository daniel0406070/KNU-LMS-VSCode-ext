import { json } from "stream/consumers";

const fs = require('fs');
const jsonfile = fs.readFileSync("../token.json");
const Token_Json = JSON.parse(jsonfile);

const API_URL = "https://canvas.knu.ac.kr";
const API_TOKEN = Token_Json["token"];
class LMS_API {
    constructor() { 

    }

    async direct_request(method: string)  {
        const url = `${API_URL}/api/v1/${method}?access_token=${API_TOKEN}`;

        const responce = await fetch(url);
        const json = await responce.json();
        return json;
    }

    get_courses(): Promise<any> {
        return this.direct_request("courses");
    }

    async get_course(course_id: number) {
        const new_course = new Course(course_id);
        await new_course.course_init(course_id);

        return new_course;
    }
}

class Course {
    id: number|null;
    name: string|null;
    api = new LMS_API;
    constructor(id: number) {
        this.id = id;
        this.name = null;
    }

    async course_init(course_id: number) {
        this.api.direct_request(`courses/${course_id}`).then((json) => {
            this.id = json["id"];
            this.name = json["name"];
        })
        .catch((error) => {
            console.log(error);
        });
    }

    get_assignments(): Promise<any> {
        return this.api.direct_request(`courses/${this.id}/assignments`);
    }

    async get_assignment(assignment_id: number) {
        const new_assignment = new assignment(assignment_id);
        await new_assignment.assignment_init(assignment_id);

        return new_assignment;
    }

    
}

class assignment {
    api = new LMS_API;

    id: number|null = null;
    name: string|null = null;
    description: string|null = null;
    due_at: string|null = null; //마감 기한 (지나도 제출은 가능)
    unlock_at: string|null = null; //제출 시작 시간
    lock_at: string|null = null; //제출 마감 시간 (지나면 제출 막힘)
    html_url: string|null = null; //과제 링크
    locked_for_user: boolean|null = null; //제출 가능 여부

    constructor(id: number) {
    }

    async assignment_init(assignment_id: number) {
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
    }
}

class discussion_topics{
    api = new LMS_API;

    id: number|null = null;
    title: string|null = null;
    message: string|null = null;
    html_url: string|null = null; //과제 링크
    locked_for_user: boolean|null = null; //제출 가능 여부

    constructor(id: number) {
    }

    async discussion_topics_init(discussion_topics_id: number) {
        this.api.direct_request(`discussion_topics/${discussion_topics_id}`).then((json) => {
            if (json != null) {
                this.id = json["id"];
                this.title = json["title"];
                this.message = json["message"];
                this.html_url = json["html_url"];
                this.locked_for_user = json["locked_for_user"];
            }
        });
    }

}

const lms = new LMS_API;
const course = lms.get_course(24579).then((course) => {
    console.log(course);
});



