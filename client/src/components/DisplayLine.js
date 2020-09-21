import React from 'react';
import DisplayField from './DisplayField';
import { formatBRL } from '../helpers/formatter';

export default function DisplayLine({ className, calculations }) {
  return (
    <>
      <div className={className}>

        <DisplayField
          description="Saldo"
          value={formatBRL(calculations.balance)}
          classContainer="_display-field"
          // styleContainer={{ flex: '2 1 auto' }}
          classLabel=""
          classValue={[(calculations.balance >= 0 && 'green-text') || 'red-text', 'text-darken-2 _display-field-value'].join(' ')}
        />

        <div className="_display-group">

          <DisplayField
            description="Despesas"
            value={formatBRL(calculations.expenses)}
            classContainer="_display-field"
            // styleContainer={{ flex: '3 1 auto' }}
            classLabel=""
            classValue="red-text text-darken-2 _display-field-value"
          />

          <DisplayField
            description="Receitas"
            value={formatBRL(calculations.income)}
            classContainer="_display-field"
            // styleContainer={{ flex: '3 1 auto' }}
            classLabel=""
            classValue="green-text text-darken-2 _display-field-value"
          />

        </div>

        <DisplayField
          description="Lançamentos"
          value={calculations.count}
          classContainer="_display-field"
          // styleContainer={{ flex: '1 1 auto' }}
          classLabel=""
          classValue="_display-field-value"
        />

      </div>
    </>
  )
}
