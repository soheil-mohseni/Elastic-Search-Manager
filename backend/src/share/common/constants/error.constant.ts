export enum ErrorMessages {
    PASSWORD_MISSMATCH = "Password and confirm_password are not same" ,
    EMAIL_EXISTS = "This email is already signed up , please use another email",
    USER_NOT_FOUND = "No record found by this id" ,
    INTERNAL_SERVER_ERROR = "Internal Server Error" ,
    INVALID_CODE = "verifiaction link is invalid" ,
    INVALID_CREDENTIAL = "Username or password is wrong , please try again",
    USERNAME_EXISTS = "This username already exists",
    GROUP_EXISTS = "This group already exists",
    SECTION_EXISTS = "This SECTION already exists",
    SECTION_NOT_FOUND = "Section is invalid",
    TOPICEXISTS = "This TOPIC already exists",
    TOPIC_NOT_FOUND = "TOPIC is invalid",
    QUESTION_EXISTS = "This QUESTION already exists",
    QUESTION_NOT_FOUND = "QUESTION is invalid",
    ANSWER_EXISTS = "This ANSWER already exists",
    NAME_EXISTS = "This name already exists" ,
    NOT_FOUND = "Nothing found by data",
    UNAUTHORIZED= "Please login first ." ,
    FORBIDDEN="You can't access to this resource",
    BAD_CONFIG="Your config is invalid "
}