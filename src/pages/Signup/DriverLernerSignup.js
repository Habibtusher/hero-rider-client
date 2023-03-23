import React, { useState } from "react";
import { Upload, Form, Input, Typography, Row, Col, Avatar, Select } from "antd";
import ImgCrop from "antd-img-crop";
import { postData } from "../../api/CommonServices";
import { LOGIN, SIGNUP } from "../../api/ApiConstant";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
const DrivingLearerSignUp = () => {
  const navigate = useNavigate()
  const imagebbKey = process.env.REACT_APP_IMAGE_BB;
  const [drivingLicence, setDrivingLicence] = useState()
  const [isNid, setIsNid] = useState(

  );
  const [nid, setNid] = useState()
  const [progilePic, setProfilePic] = useState()
  const [profileImg, setProfileImg] = useState(

  );
  const onFinish = async (values) => {

    const data = {
      full_name: values.fullname,
      email: values.email,
      password: values.password,
      address: values.address,
      phone: values.phone,
      profilepic: progilePic,
      age: values.age,
      nid: nid,
      vehicle_type: values.vehicletype,

      is_rider: false
    }
console.log(data);
    const res = await postData(SIGNUP, data)

    if (res.status === "success") {
      const data = {
        email: values.email,
        password: values.password
      }
      const res = await postData(LOGIN, data);
    
      if (res.status === 'success') {
        toast.success("Login Successfully!");
        localStorage.setItem("access_token", JSON.stringify(res.accessToken));
        localStorage.setItem("user", JSON.stringify(res.user));
        navigate('/')

      }
    }

  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const handleNidUpload = (options) => {
    const { file } = options;
    setIsNid(URL.createObjectURL(file))
    const formdata = new FormData();
    formdata.append("image", file);
    const url = ` https://api.imgbb.com/1/upload?key=${imagebbKey}`;
    fetch(url, {
      method: "POST",
      body: formdata,
    })
      .then((res) => res.json())
      .then((imgData) => {
        if (imgData.success) {
        
          setNid(imgData.data.url)
        }
      });
    
  };
  const handleUploadProfilePic = (options) => {
    const { file } = options;
    setProfileImg(URL.createObjectURL(file))
    const formdata = new FormData();
    formdata.append("image", file);
    const url = ` https://api.imgbb.com/1/upload?key=${imagebbKey}`;
    fetch(url, {
      method: "POST",
      body: formdata,
    })
      .then((res) => res.json())
      .then((imgData) => {
        if (imgData.success) {
        
          setProfilePic(imgData.data.url)
        }
      });
   
  };
  const options = [
    {
      value: "car",
      label: "Car"
    },
    {
      value: "bike",
      label: "Bike"
    },
  ]
  return (
    <div className="flex justify-center items-center">
      <div className="xl:w-1/3 lg:w-2/3 md:w-auto p-7 shadow-xl ">
        <h2 className="text-xl text-center font-bold mb-4">Driving Learner SignUp</h2>
        <div className="-mb-8">
        <Avatar size={90} src={profileImg} />
          <ImgCrop shape="round" aspect={50 / 50}>
            <Upload
              customRequest={handleUploadProfilePic}
              showUploadList={false}
            >
              <button className="btn btn-xs ml-10">Upload</button>
            </Upload>
          </ImgCrop>
        </div>
        <Form
          name="form_item_path"
          layout="vertical"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
        

          <Row gutter={[12, 0]}>
            <Col span={12}>
              <Form.Item
                label="Full Name"
                name="fullname"
                rules={
                  [
                    // {
                    //   required: true,
                    //   message: "Please input your username!",
                    // },
                  ]
                }
              >
                <Input />
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
                <Input />
                {/* <Input.Password /> */}
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={[12, 0]}>
            <Col span={12}>
              <Form.Item label="Address" name="address" rules={[]}>
                <Input />
                {/* <Input.Password /> */}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Phone" name="phone">
                <Input />
              </Form.Item>
            </Col>
          </Row>


          <Row gutter={[12, 0]}>
            <Col span={12}>
              <Form.Item label="Password" name="password" rules={[
                { required: true, message: "please enter password" },
                { min: 8, message: 'password minimum length 8 characters' }
              ]}>
                <Input.Password minLength={8} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Confirm Password" name="confirmpasseord" rules={[
                { required: true, message: "please enter confirm password" },
                { min: 8, message: 'password minimum length 8 characters' }
              ]}>
                <Input.Password minLength={8} />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={[12, 0]}>

            <Col span={12}>
              <Form.Item label="Age" name="age">
                <Input />
              </Form.Item>

            </Col>
            <Col span={12}>
              <Form.Item label="Select Vehicle Type" name="vehicletype">
                <Select

                
                  placeholder="Select Vehicle Type"
                  style={{
                    width: "100%"
                  }}
                  options={options}
                />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item label="NID Picture" className="mb-2">
            <Upload
              name="avatar"
              listType="picture-card"
              showUploadList={false}
              // beforeUpload={beforeUpload}
              customRequest={handleNidUpload}
              accept={["image/jpeg", "image/pjpeg"]}
            >
              <div>
                {isNid ? (
                  <img className="img-upload" src={isNid} />
                ) : (
                  <Typography className="consumer-upload-button-icon">
                    {" "}
                    Add
                  </Typography>
                )}
              </div>
            </Upload>
          </Form.Item>
          <Form.Item>
            <button htmlType="submit" className="btn btn-accent w-full">
              SignUp
            </button>
            {/* <Button type="primary" >
           
          </Button> */}
          </Form.Item>
          <p className="text-center text-base">Already have account ? please <Link className="text-cyan-600" to="/login">login</Link> or <Link className="text-cyan-600" to="/rider-signup">join as a driving learner</Link> </p>
        </Form>
      </div>
    </div>
  );
};

export default DrivingLearerSignUp;
