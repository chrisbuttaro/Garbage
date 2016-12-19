package controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.ObjectMapper;

import data.EventDAO;
import entities.events;


@RestController
public class EventController {
	
	@Autowired
	private EventDAO EventDAO; 
	
	@RequestMapping(value="ping", method=RequestMethod.GET)
	public String ping(){
		return "pong"; 
	}
	
	@RequestMapping(path="Events", method=RequestMethod.GET)
	public List<events> index(){
	  return EventDAO.index();
	}

	@RequestMapping(path="Events/{id}", method=RequestMethod.GET)
	public events show(@PathVariable int id){	
		return EventDAO.show(id); 
	}
	
	
	@RequestMapping(path="Events/{id}", method=RequestMethod.POST)
		public events update(@PathVariable int id, @RequestBody String EventJSON){
		ObjectMapper mapper= new ObjectMapper(); 
		events ev= null; 
		try{
			ev=mapper.readValue(EventJSON, events.class);
		}catch( Exception e){
			System.out.println(e);
		}
		return EventDAO.update(id, ev); 
	}
	@RequestMapping(path="Events",method=RequestMethod.POST)	
	public events create(@RequestBody String EventJSON){ 
		ObjectMapper mapper= new ObjectMapper(); 
		events ev= null; 
		try{
			ev=mapper.readValue(EventJSON, events.class);
		}catch( Exception e){
			System.out.println(e);
		}
		return EventDAO.create(ev); 
	}
	@RequestMapping(path="Events/{id}", method=RequestMethod.DELETE)
	public events delete(@PathVariable int id){
	return EventDAO.delete(id); 
	}
	



}
