package data; 
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.springframework.transaction.annotation.Transactional;

import entities.events;

@Transactional 
public class EventDAO {
	@PersistenceContext//includes jpa's entity manager
    private EntityManager em;
	
	public List<events> index(){
		  String query = "Select e from events e";
		  return em.createQuery(query, events.class).getResultList();
		}
	
	public events show(int id){
		return em.find(events.class,id); 
	}
	

	
	public events update(int id, events e){
		events existingEvent=em.find(events.class, id);
		if(e.getItemname()!=""){
		existingEvent.setItemname(e.getItemname());
		}
		if(e.getWeight()!=0){
			existingEvent.setWeight(e.getWeight());
			}
		if(e.getDate()!=null){
			existingEvent.setDate(e.getDate());
			}
		if(e.isRecyclable()!=null){
			existingEvent.setRecyclable(e.isRecyclable());
			}

		em.persist(existingEvent);
		em.flush(); 
		return existingEvent; 
	}
	
	public events delete(int id){
		events e=em.find(events.class, id);
		em.createQuery("Delete from events e where e.id="+id).executeUpdate();

		return e; 
	}
	
	public events create(events newEvent){
		em.persist(newEvent);
		em.flush(); 
		return newEvent; 
	}
}
