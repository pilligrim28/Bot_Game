import React from 'react';
import Modal from 'react-modal';


Modal.setAppElement('#root');

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export const ModalWrapper: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel={title}
      style={{
        content: {
          // Центрируем по экрану
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
          // Размеры: фиксированные или адаптивные
          width: '600px',    // ✅ Ширина
          maxWidth: '90%',   // ✅ Максимальная ширина (для адаптива)
          height: 'auto',    // ✅ Высота по содержимому
          maxHeight: '90vh', // ✅ Максимальная высота (90% высоты экрана)
          padding: '25px',   // ✅ Отступы внутри
          borderRadius: '10px', // ✅ Скругление
          border: '1px solid #ccc',
          display: 'flex',
          flexDirection: 'column',
        },
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.5)', // ✅ Полупрозрачный оверлей
          zIndex: 1000,
        },
      }}
    >
      <h2 style={{ margin: '0 0 15px 0', fontSize: '1.5rem' }}>{title}</h2>
      <div style={{ flex: 1, overflowY: 'auto' }}> {/* ✅ Прокрутка, если контент большой */}
        {children}
      </div>
      <div style={{ marginTop: '20px', textAlign: 'right' }}>
        <button onClick={onClose} style={{ padding: '8px 16px', fontSize: '1rem' }}>
          Закрыть
        </button>
      </div>
    </Modal>
  );
};