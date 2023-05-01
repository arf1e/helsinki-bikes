import { Subtitle } from '@/app/styled/Typography';
import { ADD_ENTITY, ADD_JOURNEY, ADD_STATION } from '@/app/types/add';
import styled, { css } from 'styled-components';
import AddressIcon from '@/app/assets/svg/address.svg';
import FlagIcon from '@/app/assets/svg/flag.svg';

const SEntitySwitch = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  border-right: 4px solid ${({ theme }) => theme.appBackgroundColor};
  padding-top: ${({ theme }) => theme.appBoxPadding};
  padding-bottom: ${({ theme }) => theme.appBoxPadding};

  .subtitle {
    margin-left: ${({ theme }) => theme.appBoxPadding};
    margin-right: ${({ theme }) => theme.appBoxPadding};
    margin-bottom: 12px;
  }
`;

const EntityOption = styled.button<{ isActive: boolean }>`
  align-self: stretch;
  box-sizing: border-box;
  height: 40px;
  background: ${({ theme }) => theme.backgroundColor};
  border: none;
  display: flex;
  justify-content: flex-start;
  font-size: 14px;
  align-items: center;
  padding: ${({ theme }) => theme.appBoxPadding};
  transition: 0.3s;
  color: ${({ theme }) => theme.darkGrayColor};
  cursor: pointer;

  .option__icon {
    margin-right: 4px;

    path {
      transition: 0.3s;
      fill: ${({ theme }) => theme.darkGrayColor};
    }
  }

  &:hover {
    color: ${({ theme }) => theme.primaryColor};

    path {
      fill: ${({ theme }) => theme.primaryColor};
    }
  }

  ${({ isActive }) =>
    isActive &&
    css`
      color: ${({ theme }) => theme.primaryColor};
      background-color: ${({ theme }) => theme.secondaryColor};

      .option__icon {
        path {
          fill: ${({ theme }) => theme.primaryColor};
        }
      }
    `}
`;

type Props = {
  entity: ADD_ENTITY;
  setEntity: (entity: ADD_ENTITY) => void;
};

const EntitySwitch = ({ entity, setEntity }: Props) => {
  return (
    <SEntitySwitch>
      <Subtitle className="subtitle">Entity type</Subtitle>
      <EntityOption isActive={entity === ADD_STATION} onClick={() => setEntity(ADD_STATION)}>
        <AddressIcon className="option__icon" width={14} height={14} viewBox="0 0 20 20" />
        <span className="option__text">Station</span>
      </EntityOption>
      <EntityOption isActive={entity === ADD_JOURNEY} onClick={() => setEntity(ADD_JOURNEY)}>
        <FlagIcon className="option__icon" width={14} height={14} viewBox="0 0 20 20" />
        <span className="option__text">Journey</span>
      </EntityOption>
    </SEntitySwitch>
  );
};

export default EntitySwitch;
