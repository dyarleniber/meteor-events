import React, { createContext, useState, useContext } from 'react';

const EventContext = createContext();

/*
 * Used React Context to pass the event (community id),
 * through the components of the application,
 * since it is used in different components.
 */
export function EventProvider({ children }) {
  const [communityId, setCommunityId] = useState();
  return (
    <EventContext.Provider value={{ communityId, setCommunityId }}>
      {children}
    </EventContext.Provider>
  );
}

export function useEvent() {
  const context = useContext(EventContext);
  const { communityId, setCommunityId } = context;
  return { communityId, setCommunityId };
}
