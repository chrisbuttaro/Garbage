package data; 
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.springframework.transaction.annotation.Transactional;

import entities.Event;

@Transactional 
public class EventDAO {
	@PersistenceContext//includes jpa's entity manager
    private EntityManager em;
	
	public List<Event> index(){
		  String query = "Select e from Event e";
		  return em.createQuery(query, Event.class).getResultList();
		}
	
	public Event show(int id){
		return em.find(Event.class,id); 
	}
	
//	public List showScores(int id){
//		String query = "Select u.scores from Event u where u.id=?1";
//		List<Object[]> scores = em.createQuery(query, Object[].class)
//				.setParameter(1, id)
//				.getResultList();
//		  return scores;
//	}
	
	public Event update(int id, Event u){
		Event existingEvent=em.find(Event.class, id);
		if(u.getItemname()!=null){
		existingEvent.setItemname(u.getItemname());
		}
		
		em.persist(existingEvent);
		em.flush(); 
		return existingEvent; 
	}
	
	public Event delete(int id){
		Event u=em.find(Event.class, id);
		em.createQuery("Delete from Event e where e.id="+id).executeUpdate();
		em.remove(u);
		return u; 
	}
	
	public Event create(Event newEvent){
		 em.persist(newEvent);
		em.flush(); 
		 
		 return newEvent; 
	}
}
