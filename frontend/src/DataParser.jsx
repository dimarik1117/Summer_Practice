import React, { useState } from 'react';
import { Typography, Input, Space } from 'antd';
import Vacancies from './componets/Vacancies';
import axios from 'axios';
import './style.css';

const DataParser = () => {
  const [vacancies, setVacancies] = useState([]);
  const [onPage, setOnPage] = useState(10);

  const choiceVacancies = (value) => {
    axios.get(`http://127.0.0.1:8000/api/v1/vacancies/?text=${value}`).then(response => {
      console.log('Отклик', response.data);
      setVacancies(response.data.slice(0, onPage));
    }).catch(error => {
      console.error('Ошибка получения вакансий', error);
    });
  }

  const { Title } = Typography;
  const { Search } = Input;
  const onSearch = (value, _e, info) => {
    console.log(info?.source, value);
    choiceVacancies(value);
  }

  return (
    <div className="flex">
      <Title level={1} style={{ textAlign: 'center', color: '#14522c', fontWeight: '900' }}>Парсинг данных с платформы hh.ru</Title>
      <Space direction="vertical">
        <Search placeholder="Поиск вакансии" onSearch={onSearch} enterButton/>
        <div className="mx-auto my-auto">
          {vacancies.map((vacancy, index) => (
            <Vacancies key={index} vacancy={vacancy} />
          ))}
        </div>
      </Space>
    </div>
  );
}

export default DataParser;