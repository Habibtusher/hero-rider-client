import { Avatar, Card, Input, Form, Row, Col, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import { GETUSER } from '../../api/ApiConstant';
import { getByEmail } from '../../api/CommonServices';

const Profile = () => {
    const [profile, setProfile] = useState()
    const user = JSON.parse(localStorage.getItem("user"));

    const [form] = Form.useForm();
    const getUser = async () => {
        const res = await getByEmail(GETUSER, user.email)
        setProfile(res.data)
    }
    form.setFieldsValue({
        fullname: profile?.full_name,
        age: profile?.age,
        email: profile?.email,
        phone: profile?.phone,
        carname: profile?.car_info?.name,
        carmodel: profile?.car_info?.model,
        carnamepalate: profile?.car_info?.name_palate,
        area: profile?.area,
        address: profile?.address,
        vehicletype: profile?.vehicle_type
    })
    useEffect(() => {
        getUser()
    }, [])
    return (
        <div className='md:w-1/2 mx-auto p-6'>
            <div>
                <p className='text-3xl'>Profile</p>
                <Card className='p-3'>
                    <Avatar size={90} src={profile?.profile_pic} />
                    <Form
                        name="form_item_path"
                        layout="vertical"
                        initialValues={{
                            remember: true,

                        }}
                        form={form}
                        //   onFinish={onFinish}
                        //   onFinishFailed={onFinishFailed}
                        autoComplete="off"
                    >


                        <Row gutter={[12, 0]}>
                            <Col span={12}>
                                <Form.Item
                                    label="Full Name"
                                    name="fullname"

                                >
                                    <Input disabled />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    label="Email"
                                    name="email"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Please input your email!",
                                        },
                                        {
                                            type: "email",
                                            message: "Please input valid email!",
                                        },
                                    ]}
                                >
                                    <Input disabled />
                                    {/* <Input.Password /> */}
                                </Form.Item>
                            </Col>
                        </Row>

                        <Row gutter={[12, 0]}>
                            <Col span={12}>
                                <Form.Item label="Address" name="address" rules={[]}>
                                    <Input disabled />
                                    {/* <Input.Password /> */}
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label="Phone" name="phone">
                                    <Input disabled />
                                </Form.Item>
                            </Col>
                        </Row>

                        {profile?.is_rider &&
                            <div>
                                <Row gutter={[12, 0]}>
                                    <Col span={12}>
                                        <Form.Item label="Area" name="area">
                                            <Input disabled />
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item label="Car Name" name="carname">
                                            <Input disabled />
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row gutter={[12, 0]}>
                                    <Col span={12}>
                                        <Form.Item label="Car Model" name="carmodel">
                                            <Input disabled />
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item label="Car Name Palate" name="carnamepalate">
                                            <Input disabled />
                                        </Form.Item>
                                    </Col>
                                </Row>
                            </div>
                        }

                        <Row gutter={[12, 0]}>
                            <Col span={12}>
                                <Form.Item label="Age" name="age">
                                    <Input disabled />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label="Select Vehicle Type" name="vehicletype">
                                    <Input disabled />
                                </Form.Item>
                            </Col>
                        </Row>

                        <Row gutter={[12, 0]}>
                            {profile?.is_rider && <Col span={12}>
                                <Form.Item label="Driving Licence Picture" className="mb-2">
                                    <img className="img-upload" src={profile?.driving_licence} />
                                </Form.Item>
                            </Col>}
                            <Col span={12}>
                                <Form.Item label="NID Picture" className="mb-2">
                                    <img className="img-upload" src={profile?.nid} />
                                </Form.Item>
                            </Col>
                        </Row>

                    </Form>
                </Card>
            </div>

        </div>
    );
};

export default Profile;