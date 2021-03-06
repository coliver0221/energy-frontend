import React from 'react';
import { Translation } from 'react-i18next';

export const EditUserIcon: React.FC = () => (
  <Translation>
    {t => (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        <div
          style={{
            position: 'relative',
          }}
        >
          <img
            className="icon"
            src="https://cdn2.iconfinder.com/data/icons/business-management-isometric-awesome-design/512/Office_Building-512.png"
          />
          <button>{t('setting.editIcon.hint')}</button>
        </div>

        <span>{t('setting.editIcon.name')}</span>

        <style jsx>{`
          .icon {
            width: 200px;
            height: 200px;
            background-color: grey;
            border-radius: 50%;
            margin: 37px;
            display: block;
          }
          button {
            position: absolute;
            bottom: 47px;
            left: 50%;
            transform: translate(-50%, 0);
          }
          span {
            width: 100%;
            text-align: center;
            font-family: Roboto;
            font-size: 20px;
            color: #707070;
          }
        `}</style>
      </div>
    )}
  </Translation>
);
