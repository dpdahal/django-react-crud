import React, {useState, useEffect} from "react";
import General from "../config/General";

function StudentComponents() {
    const [students, setStudents] = useState([]);
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");
    const [studentId, setStudentId] = useState(null);


    useEffect(() => {
        getStudents()
    },[]);

    const getStudents = () => {
        General.get('/').then((response) => {
            setStudents(response.data);
        }).catch((error) => {
            console.log(error);
        })
    }


    const AddStudent = (e) => {
        e.preventDefault();
        if (studentId) {
            let sendData = {name, address, phone};
            General.patch(`/${studentId}/`, sendData).then((res) => {
                getStudents();
                setName('');
                setAddress('');
                setPhone('');
                setStudentId(null);
            }).catch((err) => {
                console.log(err)
            });
        } else {
            let sendData = {name, address, phone};
            General.post('/', sendData).then((res) => {
                getStudents();
                setName('');
                setAddress('');
                setPhone('');
            }).catch((err) => {
                console.log(err)
            });
        }
    }

    const getByCriteria = (id) => {
        let sData = students.filter((student) => student.id === id)[0];
        setName(sData.name);
        setAddress(sData.address);
        setPhone(sData.phone);
        setStudentId(sData.id);
    }

    const deleteStudent = (id) => {
        General.delete(`/${id}/`).then((res) => {
            getStudents();
        }).catch((err) => {
            console.log(err);
        })
    }


    return (
        <React.Fragment>
            <h1>Add Student Record: </h1>

            <form action="" onSubmit={AddStudent}>
                {studentId ? (<input type="hidden" value={studentId}/>) : ('')}
                <label htmlFor="name">Name: </label> <br/>
                <input type="text" value={name}
                       onChange={(e) => setName(e.target.value)}
                /> <br/>
                <label htmlFor="address">Address</label> <br/>
                <input type="text" value={address}
                       onChange={(e) => setAddress(e.target.value)}
                /> <br/>
                <label htmlFor="phone">Phone</label> <br/>
                <input type="text" value={phone}
                       onChange={(e) => setPhone(e.target.value)}
                /> <br/><br/>
                {studentId ? (
                    <button>Update Record</button>
                ) : (
                    <button>Add Record</button>
                )}

            </form>


            <hr/>

            <table border="1" width="100%">
                <thead>
                <tr>
                    <th>S.n</th>
                    <th>Name</th>
                    <th>Address</th>
                    <th>Phone</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                {students.map((student, index) => {
                    return (
                        <tr key={index}>
                            <td>{++index}</td>
                            <td>{student.name}</td>
                            <td>{student.address}</td>
                            <td>{student.phone}</td>
                            <td>
                                <button onClick={() => getByCriteria(student.id)}>Edit</button>
                                <button onClick={() => deleteStudent(student.id)}>Delete</button>
                            </td>

                        </tr>
                    )
                })}

                </tbody>
            </table>
        </React.Fragment>
    )

}

export default StudentComponents;
