import React from 'react';
import { Card } from 'antd';

function Vacancies({ vacancy }) {
  const characters = Object.keys(vacancy);

  return (
    <Card
      title={`Вакансия №${vacancy.id}`}
      styles={{
        header: {
          backgroundColor: '#19ff71',
          color: '#14522c',
          borderTopRadius: 15,
        },
        body: {
          backgroundColor: '#a1f5c1',
          borderBottomRadius: 15,
        },
      }}
      style={{
        marginBottom: 8,
        borderRadius: 15,
      }}
    >
      {characters.map((key, index) => (
        vacancy[key] && ( <p key={index}><strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong> {vacancy[key]}</p> )
      ))}
    </Card>
  );
}

export default Vacancies; 