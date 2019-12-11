import React from 'react';
import { Navbar, Nav, Form, Badge, Dropdown } from 'react-bootstrap';
import './Board.css';



class home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }

    }

    render() {
        document.body.style = 'background: #DDDDDD;';
        return (

            <div>
                <Navbar bg="primary" variant="dark" className="fixed-top">
                    <Navbar.Brand >
                        Medical Service System
                    </Navbar.Brand>
                    <Nav className="mr-auto">
                    </Nav>

                    <Form inline>
                        <Dropdown >
                            <Dropdown.Toggle className="toggle-button" variant="secondary">
                                <font color="white">
                                    郭泓志
                                </font>&nbsp;
                    </Dropdown.Toggle>
                            <Dropdown.Menu className="dropdown-menu-right">
                                <Dropdown.Item eventKey="1">
                                    <div onClick={() => { this.goToModifyPersonalInformation() }}>Modify personal information</div>
                                </Dropdown.Item>
                                <Dropdown.Item eventKey="2" href="/ezKanban/logout">
                                    Logout
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Form>
                </Navbar><br /><br /><br /><br />
                <div className="button-position" style={{ display: 'flex' }}>
                    <table align="center" border="1px"><tbody>
                        <tr>
                            <td>
                                <img src="/src/avatar.png" width="500px" height="500px" />
                            </td>
                            <tr>
                                <td>姓名 : </td>
                                <td>郭泓志</td>
                            </tr>
                            <tr>
                                <td>性別 : </td>
                                <td>男</td>
                            </tr>
                            <tr>
                                <td>身分證字號 : </td>
                                <td>A171492024</td>
                            </tr>
                            <tr>
                                <td>出生年月日 : </td>
                                <td>1990/12/25</td>
                            </tr>
                            <tr>
                                <td>年齡 : </td>
                                <td>30 歲</td>
                            </tr>
                            <tr>
                                <td>身高 : </td>
                                <td>180 cm</td>
                            </tr>
                            <tr>
                                <td>體重 : </td>
                                <td>75 kg</td>
                            </tr>
                            <tr>
                                <td>血型 : </td>
                                <td>O</td>
                            </tr>
                            <tr>
                                <td>家族病史 : </td>
                                <td>心臟病</td>
                            </tr>
                            <tr>
                                <td>過敏藥物 : </td>
                                <td>無</td>
                            </tr>
                            <tr>
                                <td>住址 : </td>
                                <td>台北市忠孝東路三段一號</td>
                            </tr>
                            <tr>
                                <td>住家電話 : </td>
                                <td>(02)2771-2171</td>
                            </tr>
                            <tr>
                                <td>手機 : </td>
                                <td>0912345678</td>
                            </tr>
                            <tr>
                                <td>監護人姓名 : </td>
                                <td>郭台銘</td>
                            </tr>
                            <tr>
                                <td>監護人關係 : </td>
                                <td>父子</td>
                            </tr>
                            <tr>
                                <td>監護人手機 : </td>
                                <td>0987654321</td>
                            </tr>
                            <tr>
                                <td>備註 : </td>
                                <td>無</td>
                            </tr>
                        </tr></tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default home;