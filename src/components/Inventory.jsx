import React, { useState, useMemo, useEffect } from 'react';
import { Modal, Form, Input, InputNumber, Select, Space, Table, Typography, Popconfirm } from 'antd';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Check } from 'lucide-react';
import { X } from 'lucide-react';
import { SquarePen } from 'lucide-react';
import { Plus } from 'lucide-react';
import { Trash } from 'lucide-react';

ChartJS.register(ArcElement, Tooltip, Legend);

const { Search } = Input;
const { Option } = Select;

const EditableCell = ({ editing, dataIndex, title, inputType, record, children, ...restProps }) => {
    const inputNode =
        dataIndex === 'quantity' ? (
            <InputNumber style={{ width: '100%' }} min={1} />
        ) : inputType === 'number' ? (
            <InputNumber style={{ width: '100%' }} precision={2} />
        ) : (
            <Input />
        );

    return (
        <td {...restProps}>
            {editing ? (
                <Form.Item
                    name={dataIndex}
                    style={{ margin: 0 }}
                    rules={[{ required: true, message: `Please Input ${title}!` }]}>
                    {inputNode}
                </Form.Item>
            ) : (
                children
            )}
        </td>
    );
};

const Inventory = () => {
    const [inventoryData, setInventoryData] = useState(() => {
        const savedData = localStorage.getItem('inventoryData');
        return savedData ? JSON.parse(savedData) : [];
    });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [form] = Form.useForm();
    const [editForm] = Form.useForm();
    const [editingKey, setEditingKey] = useState('');

    useEffect(() => {
        localStorage.setItem('inventoryData', JSON.stringify(inventoryData));
    }, [inventoryData]);

    const showModal = () => setIsModalOpen(true);
    const handleCancel = () => {
        setIsModalOpen(false);
        form.resetFields();
    };

    const handleOk = () => {
        form.validateFields()
            .then((values) => {
                const totalPrice = (values.quantity * values.pricePerUnit).toFixed(2);
                const newItem = {
                    key: `${Date.now()}`,
                    ...values,
                    totalPrice: parseFloat(totalPrice),
                };
                setInventoryData((prevData) => [...prevData, newItem]);
                form.resetFields();
                setIsModalOpen(false);
            })
            .catch((error) => {
                console.error('Validation Failed:', error);
            });
    };

    const handleDelete = (key) => {
        const newData = inventoryData.filter((item) => item.key !== key);
        setInventoryData(newData);
    };

    const isEditing = (record) => record.key === editingKey;

    const edit = (record) => {
        editForm.setFieldsValue({
            ...record,
        });
        setEditingKey(record.key);
    };

    const cancel = () => {
        setEditingKey('');
    };

    const save = async (key) => {
        try {
            const row = await editForm.validateFields();
            const totalPrice = (row.quantity * row.pricePerUnit).toFixed(2);

            const newData = [...inventoryData];
            const index = newData.findIndex((item) => key === item.key);

            if (index > -1) {
                const item = newData[index];
                newData.splice(index, 1, {
                    ...item,
                    ...row,
                    totalPrice: parseFloat(totalPrice),
                });
                setInventoryData(newData);
                setEditingKey('');
            }
        } catch (errInfo) {
            console.log('Validate Failed:', errInfo);
        }
    };

    const filteredData = useMemo(() => {
        return inventoryData.filter(item =>
            item.items.toLowerCase().includes(searchText.toLowerCase()) ||
            item.category.toLowerCase().includes(searchText.toLowerCase())
        );
    }, [inventoryData, searchText]);

    const getCategoryCounts = () => {
        return inventoryData.reduce((acc, item) => {
            acc[item.category] = (acc[item.category] || 0) + 1;
            return acc;
        }, {});
    };

    const categoryCounts = getCategoryCounts();
    const categoryLabels = Object.keys(categoryCounts);
    const categoryValues = Object.values(categoryCounts);

    const data = {
        labels: categoryLabels,
        datasets: [
            {
                data: categoryValues,
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
                hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'bottom',
                labels: {
                    boxWidth: 20,
                    font: {
                        size: 10
                    }
                }
            }
        }
    };

    const columns = [
        {
            title: 'Item Name',
            dataIndex: 'items',
            key: 'items',
            editable: true,
            responsive: ['xs', 'sm', 'md', 'lg', 'xl'],
        },
        {
            title: 'Category',
            dataIndex: 'category',
            key: 'category',
            filters: [
                { text: 'Food', value: 'food' },
                { text: 'Health', value: 'health' },
                { text: 'Furniture', value: 'furniture' },
                { text: 'Electronics', value: 'electronics' },
                { text: 'Others', value: 'others' },
            ],
            onFilter: (value, record) => record.category.toLowerCase().includes(value.toLowerCase()),
            responsive: ['xs', 'sm', 'md', 'lg', 'xl'],
        },
        {
            title: 'Quantity',
            dataIndex: 'quantity',
            key: 'quantity',
            editable: true,
            sorter: (a, b) => a.quantity - b.quantity,
            responsive: ['xs', 'sm', 'md', 'lg', 'xl'],
        },
        {
            title: 'Unit',
            dataIndex: 'unit',
            key: 'unit',
            responsive: ['xs', 'sm', 'md', 'lg', 'xl'],
        },
        {
            title: 'Price per Unit',
            dataIndex: 'pricePerUnit',
            key: 'pricePerUnit',
            editable: true,
            sorter: (a, b) => a.pricePerUnit - b.pricePerUnit,
            responsive: ['xs', 'sm', 'md', 'lg', 'xl'],
        },
        {
            title: 'Total Price',
            dataIndex: 'totalPrice',
            key: 'totalPrice',
            sorter: (a, b) => a.totalPrice - b.totalPrice,
            responsive: ['xs', 'sm', 'md', 'lg', 'xl'],
        },
        {
            title: 'Actions',
            dataIndex: 'operation',
            width: 100,
            render: (_, record) => {
                const editable = isEditing(record);
                return editable ? (
                    <div className='flex space-x-2'>
                        <div onClick={() => save(record.key)}>
                            <Check />
                        </div>
                        <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
                            <X />
                        </Popconfirm>
                    </div>
                ) : (
                    <div className='flex items-center space-x-2'>
                        <div
                            disabled={editingKey !== ''}
                            onClick={() => edit(record)}
                            className='flex items-center'
                        >

                            <SquarePen />
                        </div>
                        <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.key)}>

                            <Trash />
                        </Popconfirm>
                    </div>
                );
            },
        },
    ];

    const mergedColumns = columns.map((col) => {
        if (!col.editable) {
            return col;
        }
        return {
            ...col,
            onCell: (record) => ({
                record,
                inputType: col.dataIndex === 'pricePerUnit' ? 'number' :
                    col.dataIndex === 'quantity' ? 'number' : 'text',
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditing(record),
            }),
        };
    });

    const rowClassName = (record) => {
        const lowQuantityClass = record.quantity < 5 ? 'bg-red-100 text-red-800' : '';
        const lowPriceClass = record.totalPrice < 50 ? 'bg-yellow-100 text-yellow-800' : '';
        return `${lowQuantityClass} ${lowPriceClass}`.trim();
    };

    return (
        <div className='flex flex-col lg:flex-row w-full mt-5'>
            <div className='tableContext w-full lg:w-[74%]'>
                <div className="bg-white h-full mx-6 mb-5 mt-3 rounded-xl">
                    <div className="items-header flex flex-col md:flex-row items-center justify-around pb-5 pt-3 px-4">
                        <Space direction="vertical" className='w-full md:w-auto mb-2 md:mb-0'>
                            <Search
                                placeholder="Search inventory"
                                value={searchText}
                                onChange={(e) => setSearchText(e.target.value)}
                                className='w-full md:w-[250px]'
                            />
                        </Space>
                        <button onClick={showModal} className='bg-[#e5857b] hover:bg-[#e5867bd7] flex px-4 py-1 rounded-lg text-white'>
                            <Plus />
                            Add Item
                        </button>
                    </div>

                    <Form form={editForm} component={false}>
                        <Table
                            components={{
                                body: {
                                    cell: EditableCell,
                                },
                            }}
                            dataSource={filteredData}
                            columns={mergedColumns}
                            pagination={{
                                pageSize: 6,
                                responsive: true
                            }}
                            rowClassName={rowClassName}
                            rowKey="key"
                            scroll={{ x: true }}
                            className='w-full overflow-x-auto'
                        />
                    </Form>
                </div>

                {/* Modal remains the same */}
                <Modal
                    title="Add New Inventory Item"
                    open={isModalOpen}
                    onOk={handleOk}
                    onCancel={handleCancel}
                    okText="Add"
                    cancelText="Cancel"
                    className="modal-custom-width"
                >
                    <Form
                        form={form}
                        layout="vertical"
                        name="add_item_form"
                    >
                        <Form.Item
                            name="items"
                            label="Item Name"
                            rules={[{ required: true, message: 'Please input the item name!' }]}
                        >
                            <Input placeholder="Enter item name" />
                        </Form.Item>

                        <Form.Item
                            name="category"
                            label="Category"
                            rules={[{ required: true, message: 'Please select a category!' }]}
                        >
                            <Select placeholder="Select category">
                                <Option value="food">Food</Option>
                                <Option value="health">Health</Option>
                                <Option value="furniture">Furniture</Option>
                                <Option value="electronics">Electronics</Option>
                                <Option value="others">Others</Option>
                            </Select>
                        </Form.Item>

                        <Form.Item
                            name="quantity"
                            label="Quantity"
                            rules={[{ required: true, type: 'number', min: 1, message: 'Please input a valid quantity!' }]}
                        >
                            <InputNumber
                                style={{ width: '100%' }}
                                placeholder="Enter quantity"
                                min={1}
                            />
                        </Form.Item>

                        <Form.Item
                            name="unit"
                            label="Unit"
                            rules={[{ required: true, message: 'Please select a unit!' }]}
                        >
                            <Select placeholder="Select unit">
                                <Option value="pieces">Pieces</Option>
                                <Option value="kg">Kg</Option>
                                <Option value="liters">Liters</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item
                            name="pricePerUnit"
                            label="Price per Unit"
                            rules={[{ required: true, type: 'number', min: 0, message: 'Please input a valid price!' }]}
                        >
                            <InputNumber
                                style={{ width: '100%' }}
                                placeholder="Enter price per unit"
                                precision={2}
                                min={0}
                            />
                        </Form.Item>
                    </Form>
                </Modal>
            </div>

            {inventoryData.length > 0 && (
                <div className="statistics w-full lg:w-[25%] bg-white text-black mt-3 mx-6 lg:mr-6 h-full rounded-lg py-6">
                    <p className="text-xl font-semibold mb-2 text-center">Category Distribution</p>
                    <div className="donut-chart-container w-full h-[250px]">
                        <Pie
                            data={data}
                            options={{
                                ...options,
                                responsive: true,
                                maintainAspectRatio: false
                            }}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default Inventory;