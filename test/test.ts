import { json } from "stream/consumers";

let Token_Json = JSON.parse("../token.json");

const API_URL = "https://canvas.knu.ac.kr";
const API_TOKEN = Token_Json["token"];
class LMS_API {
    constructor() { 

    }



    direct_request(method: string)  {
        const url = `${API_URL}/api/v1/${method}?access_token=${API_TOKEN}`;

        let answer = null;
        fetch(url)
            .then((response) => response.json())
            .then((json) => {answer = json;})
            .catch((error) => {
                console.log(error)
                answer = null;   
            });

        return answer;
    }

    get_courses() {
        return this.direct_request("courses");
    }

    get_course(course_id: number) {
        return new Course(course_id);
    }
}

class Course {
    id: number|null;
    name: string|null;
    api = new LMS_API;
    constructor(id: number) {
        this.id = id;
        this.name = null;
        this.course_init(id);
    }

    course_init(course_id: number) {
        const course_info = this.api.get_course(course_id);
        if (course_info != null) {
            this.id = course_info["id"];
            this.name = course_info["name"];
        }
    }

    get_assignments() {
        return this.api.direct_request(`courses/${this.id}/assignments`);
    }

    get_assignment(assignment_id: number) {
        return new assignment(assignment_id);
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
        this.assignment_init(id);
    }

    assignment_init(assignment_id: number) {
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

class discussion_topics{
    api = new LMS_API;

    id: number|null = null;
    title: string|null = null;
    message: string|null = null;
    html_url: string|null = null; //과제 링크
    locked_for_user: boolean|null = null; //제출 가능 여부

    constructor(id: number) {
        this.discussion_topics_init(id);
    }

    discussion_topics_init(discussion_topics_id: number) {
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

