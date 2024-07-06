import React, { useState } from 'react';
import { Typography, Input, Space, Select, InputNumber } from 'antd';
import Vacancies from './componets/Vacancies';
import axios from 'axios';
import './style.css';

const { Title } = Typography;
const { Search } = Input;
const { Option } = Select;

const DataParser = () => {
  const [vacancies, setVacancies] = useState([]);
  const [onPage, setOnPage] = useState(10);
  const [period, setPeriod] = useState('all');
  const [salary, setSalary] = useState(null);
  const [currency, setCurrency] = useState('RUR');
  const [searchKey, setSearchKey] = useState(0);

  const choiceVacancies = (value) => {
    const params = {
      text: value,
      period: period !== 'all' ? period : undefined,
      salary: salary !== null ? salary : undefined,
      currency: currency
    };

    axios.get('http://127.0.0.1:8000/api/v1/vacancies/', { params })
      .then(response => {
        console.log('Отклик', response.data);
        setVacancies(response.data.slice(0, onPage));
        setSearchKey(prevKey => prevKey + 1);
      })
      .catch(error => {
        console.error('Error fetching vacancies', error);
      });
  }

  const onSearch = (value, _e, info) => {
    console.log(info?.source, value);
    choiceVacancies(value);
  }

  return (
    <div className="flex">
      <Title level={1} style={{ textAlign: 'center', color: '#14522c', fontWeight: '900' }}>Парсинг данных с платформы hh.ru</Title>
      <Space direction="vertical">
        <Search placeholder="Поиск вакансии" onSearch={onSearch}  style={{ width: 300 }} enterButton />
        
        <Select value={period} onChange={setPeriod} style={{ width: 150 }}>
          <Option value="7">7 дней</Option>
          <Option value="20">20 дней</Option>
          <Option value="all">Всё время</Option>
        </Select>

        <InputNumber 
          value={salary} 
          onChange={setSalary} 
          placeholder="Зарплата" 
          style={{ width: 250, backgroundColor: '#a1f5c1', borderColor: '#14522c' }} 
        />

        <Select value={currency} onChange={setCurrency} style={{ width: 150 }}>
          <Option value="RUR">Руб ₽</Option>
          <Option value="EUR">Евро €</Option>
        </Select>

        <div className="mx-auto my-auto">
          {vacancies.map((vacancy, index) => (
            <Vacancies key={`${index}-${searchKey}`} vacancy={vacancy} />
          ))}
        </div>
      </Space>
    </div>
  );
}

export default DataParser;