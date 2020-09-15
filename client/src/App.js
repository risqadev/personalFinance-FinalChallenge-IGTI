import React, { useState, useEffect, useRef, /* useCallback, useMemo, useReduce */ } from 'react';
import api from './services/api';
import Selector from './components/Selector';
import DisplayLine from './components/DisplayLine';
import EntriesList from './components/EntriesList';
import ModalReact from './components/ModalReact';
import ActionSearch from './components/ActionSearch';


export default function App() {
  console.log('App() excope');

  const today = new Date();
  const yyyy = String(today.getFullYear());
  const mm = String().concat('0', today.getMonth() + 1).slice(-2);
  const dd = String().concat('0', today.getDate()).slice(-2);
  const yearMonthDay = `${yyyy}-${mm}-${dd}`;

  const allPeriods = useRef([]);
  const periodEntries = useRef([]);
  // const [periodEntries, setPeriodEntries] = useState([]);
  const isEditing = useRef({
    status: false,
    entry: {
      type: '-',
      date: yearMonthDay,
    }
  });


  const [currentPeriod, setCurrentPeriod] = useState({
    value: yearMonthDay.substring(0, 7),
    index: 0
  });
  const [filteredEntries, setFilteredEntries] = useState([]);
  const [searchInput, setSearchInput] = useState(null);
  const [calculations, setCalculations] = useState({});
  const [modalIsOpen, setIsOpen] = useState(false);


  const postEntry = async (entry) => {

    try {
      const { data } = await api.post('transaction', entry);

      if (data.yearMonth === currentPeriod.value) {
        const entries = [...periodEntries.current, data]
          .sort((item, next) => item.day - next.day);

        periodEntries.current = entries;
        // setPeriodEntries([...entries]);

        setFilteredEntries([...entries]);
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  const deleteEntry = async (id) => {
    try {
      await api.delete(`transaction/${id}`);

      const cleanedEntries = periodEntries.current.filter(({ _id }) => _id !== id);

      periodEntries.current = cleanedEntries;
      // setPeriodEntries([...cleanedEntries]);

      setFilteredEntries([...cleanedEntries]);
    } catch (error) {
      console.log(error.message);
    }
  }

  const putEntry = async (entry) => {
    try {
      const { data } = await api.put(`transaction/${entry._id}`, entry);

      if (data.yearMonth === currentPeriod.value) {
        const entries = [...periodEntries.current];
        const index = entries.findIndex(entry => entry._id === data._id);

        entries[index] = { ...data };

        entries.sort((item, next) => item.day - next.day);

        periodEntries.current = entries;
        // setPeriodEntries([...entries]);

        setFilteredEntries([...entries]);
      }
    } catch (error) {
      console.log(error.message);
    }
  }


  const editItem = (id) => {
    isEditing.current = {
      status: true,
      entry: periodEntries.current.find(entry => entry._id === id)
    };

    openModal();
  }

  const openModal = () => {
    setIsOpen(true);
  }

  const closeModal = () => {
    setIsOpen(false);

    isEditing.current = {
      status: false,
      entry: {
        type: '-',
        date: yearMonthDay
      }
    };
  }


  const handleSelector = ({ tagName, value, selectedIndex }) => {
    const selected =
      tagName === 'SELECT'
        ? {
          value,
          index: selectedIndex
        }
        : value === '<'
          ? {
            value: allPeriods.current[currentPeriod.index - 1],
            index: currentPeriod.index - 1
          }
          : value === '>'
            ? {
              value: allPeriods.current[currentPeriod.index + 1],
              index: currentPeriod.index + 1
            }
            : {};

    setCurrentPeriod({ ...selected });
  }

  const handleItemClick = ({ id, value }) => {
    value === 'edit' && editItem(id);
    value === 'delete' && deleteEntry(id);
  }

  const handleSave = (entry) => {
    isEditing.current.status === false
      ? postEntry(entry)
      : putEntry(entry);

    closeModal();

    setSearchInput(null);
  }

  const handleSearch = ({ target: { value } }) => {
    console.log('handleSearch ' + value);

    setSearchInput(value);

    const filter = periodEntries.current.filter(entry =>
      entry.description.includes(value)
    );

    setFilteredEntries([...filter]);
  }


  useEffect(() => {
    const getPeriodEntries = async () => {
      const { data: { entries, periods } } =
        await api.get(`transaction/?period=${currentPeriod.value}`);

      entries.sort((item, next) => item.day - next.day);
      periods.sort((item, next) => item.localeCompare(next));

      currentPeriod.index = periods.findIndex(
        item => item === currentPeriod.value
      );

      allPeriods.current = periods;
      // setAllPeriods([periods]);

      periodEntries.current = entries;
      // setPeriodEntries([...entries]);

      setFilteredEntries([...entries]);

      // if (index !== currentPeriod.index) {
      setCurrentPeriod(currentPeriod);
      // }
    };

    getPeriodEntries();
  }, [currentPeriod]);


  useEffect(() => {
    const count = filteredEntries.length;
    const income = filteredEntries
      .filter(({ type }) => type === '+')
      .reduce((accumullator, { value }) => accumullator += value, 0);
    const expenses = filteredEntries
      .filter(({ type }) => type === '-')
      .reduce((accumullator, { value }) => accumullator += value, 0)

    setCalculations({
      count,
      income,
      expenses,
      balance: income - expenses
    })
  }, [filteredEntries]);



  return (
    <div className="container">
      {/* <h2 className="center">Desafio Final do Bootcamp Full Stack</h2> */}
      <h1 className="center">Gerenciador Financeiro</h1>

      <Selector
        items={{
          currentIndex: currentPeriod.index,
          currentValue: currentPeriod.value,
          list: [...allPeriods.current]
        }}
        onChange={handleSelector}
      />

      <DisplayLine
        calculations={calculations}
        otherInfos
      />

      {/* <ActionsLine onSaveNew={handleSaveNew} onSearch={handleSearch} isEditing={isEditing} /> */}

      <div className="row">

        <ModalReact onSave={handleSave} openModal={openModal} closeModal={closeModal} modalIsOpen={modalIsOpen} setIsOpen={setIsOpen} isEditing={isEditing.current} />

        <ActionSearch searchInput={searchInput} onChange={handleSearch} />
      </div>

      <EntriesList
        items={filteredEntries}
        onClick={handleItemClick}
      />

      {/* <Footer className="page-footer"> */}
      <div className="page-footer">
        <span className="page-footer footer-copyright">copyright</span>
      </div>
      {/* </Footer> */}

    </div>
  );
}
