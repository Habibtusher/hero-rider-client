import { Input, Pagination, Radio, Select, Spin, Table } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { BLOCKUSER, BLOCKUSERS, GETUSERS } from '../../api/ApiConstant';
import { base_url } from '../../api/BaseUrl';
import { getDtaWithPagination, postData } from '../../api/CommonServices';

const Dashboard = () => {
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(10)
  const [users, setUsers] = useState([]);
  const [todatCount, setTodatCount] = useState();

  const [emailFilter, setEmailFilter] = useState('');

  const [ageRangeFilter, setAgeRangeFilter] = useState();
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [filterValue, setFilterValue] = useState();

  const handleCheckboxChange = (event) => {
    const userId = event.target.value;
    if (event.target.checked) {
      setSelectedUsers([...selectedUsers, userId]);
    } else {
      setSelectedUsers(selectedUsers.filter((id) => id !== userId));
    }
  }

  const handleBlockUsers = async (id) => {
    if (id) {
      setLoading(true)
      const res = await postData(BLOCKUSER, { id: id });
      if (res.status === 'success') {
        toast.success(res.message)
      }
      getUsers()
      setLoading(false)
    }
    else {
      setLoading(true)
      const res = await postData(BLOCKUSERS, { ids: selectedUsers });
      if (res.status === 'success') {
        toast.success(res.message)
      }
      setSelectedUsers([])
      getUsers()
      setLoading(false)
    }
  }

  const getUsers = async () => {
    setLoading(true)
    const res = await axios.get(`${base_url}/get-users`, {
      params: {
        page: page,
        limit: limit,
        search: emailFilter,
        ageRange: ageRangeFilter,
      }
    });
    setTodatCount(res.data.totalData)
    setUsers(res.data.users)
    setLoading(false)
  }
  useEffect(() => {
    getUsers()
  }, [page, limit, emailFilter, ageRangeFilter])


  const paginationsChange = (page) => {
    setPage(page)
  }
  const onChange = (value) => {
    setAgeRangeFilter(value)
  };
  const onSearch = (value) => {
    console.log('search:', value);
  };

  return (
  
    <Spin spinning={loading}>
    <div className='min-h-screen container mx-auto'>
      <div className='sm:flex sm:items-center justify-between mb-3 gap-3'>
        <div className="mb-2">

          <Input.Search
            style={{ width: "300px" }}
            placeholder="search"
            value={filterValue}
            onSearch={(value) => {
              setEmailFilter(value)

            }}
            onChange={(e) => {
              setFilterValue(e.target.value)
            }}

          />
        </div>
        <div className='flex items-center gap-4 mb-2'>
          <Select
            style={{ width: "200px" }}
            showSearch
            placeholder="Select age range"
            optionFilterProp="children"
            value={ageRangeFilter}
            onChange={onChange}
            onSearch={onSearch}
            filterOption={(input, option) =>
              (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
            }
            options={[
              {
                value: '18-25',
                label: '18-25',
              },
              {
                value: '26-30',
                label: '26-30',
              },
              {
                value: '31-35',
                label: '31-35',
              },
              {
                value: '36-40',
                label: '36-40',
              },
            ]} />
          <div className="tooltip" data-tip="clear filter">
            <button onClick={() => {
              setAgeRangeFilter()
              setEmailFilter()
              setFilterValue()
              // getUsers()
            }} className="btn btn-circle btn-outline btn-sm">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>
        </div>


      </div>
      <div className="overflow-x-auto w-full">
        <table className="table w-full">
          {/* head */}
          <thead>
            <tr>
              <th>
                <label>
                  <input onClick={(event) => {
                    if (event.target.checked) {
                      const userIds = users.map((user) => user._id)
                      setSelectedUsers(userIds)
                    } else {
                      setSelectedUsers([]);
                    }

                  }} type="checkbox" className="checkbox" />
                </label>
              </th>
              <th>Picture</th>
              <th>Name</th>
              <th>Address</th>
              <th>Age</th>
              <th>Email</th>
              <th>Phone</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {
              users?.map((user) =>
                <tr key={user._id}>
                  <th>
                    <label>
                      <input
                        className="checkbox"
                        type="checkbox"
                        value={user._id}
                        checked={selectedUsers?.includes(user._id)}
                        onChange={handleCheckboxChange}
                      />
                    </label>
                  </th>
                  <td>
                    <div className="avatar">
                      <div className="mask mask-squircle w-10 h-10">
                        <img src={user.profile_pic} alt="Profile pic" />
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="flex items-center space-x-3">

                      <div>
                        <div className="font-bold">{user.full_name}</div>

                      </div>
                    </div>
                  </td>
                  <td>
                    {user.address}

                  </td>
                  <td>
                    {user.age}

                  </td>
                  <td>
                    {user.email}
                  </td>
                  <td>{user.phone}</td>
                  <th>
                    {
                      user.user_status === "active" ?
                        <button onClick={() => handleBlockUsers(user._id)} className="btn btn-outline btn-xs ">Block</button>
                        :
                        <p className='text-sm'>Blocked</p>
                    }
                  </th>
                </tr>
              )}

          </tbody>
        </table>
        <button className={` btn `} disabled={selectedUsers?.length === 0} onClick={() => handleBlockUsers()}>
          Block selected users
        </button>

      </div>
      <div className="mt-3 text-center mb-2 ">
        <Pagination
          current={page}
          pageSize={limit}
          onChange={paginationsChange}
          total={todatCount}
          pageSizeOptions={["10"]}
        />
      </div>
    </div>
    </Spin>
  
  );
};

export default Dashboard;