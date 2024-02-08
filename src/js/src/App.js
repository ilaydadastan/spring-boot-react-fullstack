import "./App.css";
import {getAllStudents} from "./client";
import {Component} from "react";
import {Avatar, Empty, Modal, Spin, Table} from "antd";
import Container from "./Container";
import {LoadingOutlined} from "@ant-design/icons";
import Footer from "./Footer";
import AddStudentForm from "./forms/AddStudentForm";
import {errorNotification} from "./notification/Notification";


class App extends Component {
    state = {
        students: [],
        isFetching: false,
        isAddStudentModalVisible: false
    }

    componentDidMount() {
        this.fetchStudents();
    }

    openAddStudentModal = () => this.setState({isAddStudentModalVisible: true})
    closeAddStudentModal = () => this.setState({isAddStudentModalVisible: false})


    fetchStudents = () => {
        this.setState({
            isFetching: true
        })
        getAllStudents()
            .then(res => res.json()
                .then(students => {
                    console.log(students)
                    this.setState({
                        students, isFetching: false
                    })
                }))
            .catch(error => {
                console.log(error.error)
                const message = error && error.error ? error.error.message : "Unknown error occurred";
                const description = error && error.error ? error.error.httpStatus : "Unknown status";
                errorNotification(message, description);
                this.setState({
                    isFetching: false
                })
            })
    }

    render() {
        const {students, isFetching, isAddStudentModalVisible} = this.state;
        const commonElements = () => (
            <div>
                <Modal title='Add new Student'
                       open={isAddStudentModalVisible}
                       onOk={this.closeAddStudentModal}
                       onCancel={this.openAddStudentModal}
                       width={1000}>
                    <AddStudentForm
                        onSuccess={() => {
                            this.closeAddStudentModal();
                            this.fetchStudents();
                        }}
                        onFailure = {(error) => {
                            const message = error && error.error ? error.error.message : "Unknown error occurred";
                            const description = error && error.error ? error.error.httpStatus : "Unknown status";
                            errorNotification(message, description);
                        }}
                    />
                </Modal>
                <Footer numberOfStudents={students.length}
                        handleAddStudentClickEvent={this.openAddStudentModal}></Footer>
            </div>
        )
        if (isFetching) {
            return (
                <Container>
                    <Spin indicator={<LoadingOutlined style={{fontSize: 24}} spin/>}/>
                </Container>
            )
        }
        if (students && students.length) {
            const columns = [
                {
                    title: '',
                    key: 'avatar',
                    render: (text, student) => (
                        <Avatar size='large'>
                            {`${student.firstName.charAt(0).toUpperCase()}, ${student.lastName.charAt(0).toUpperCase()}`}
                        </Avatar>
                    )
                },
                {
                    title: "Student Id",
                    dataIndex: "studentId",
                    key: "studentId",
                },
                {
                    title: "First Name",
                    dataIndex: "firstName",
                    key: "firstName",
                },
                {
                    title: "Last Name",
                    dataIndex: "lastName",
                    key: "lastName",
                },
                {
                    title: "Email",
                    dataIndex: "email",
                    key: "email",
                },
                {
                    title: "Gender",
                    dataIndex: "gender",
                    key: "gender",
                }
            ];
            return (
                <Container>
                    <Table
                        style={{marginBottom: '100px'}}
                        dataSource={students}
                        columns={columns}
                        pagination={false}
                        rowKey="studentId"/>
                    {commonElements()}
                </Container>
            );
        }
        return <Container>
            <Empty description={
                <h1>No students found</h1>
            }/>
            {commonElements()}
        </Container>
    }

}

export default App;
