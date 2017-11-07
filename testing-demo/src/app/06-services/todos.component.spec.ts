import { TodosComponent } from './todos.component'; 
import { TodoService } from './todo.service'; 
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';
import 'rxjs/add/observable/empty';
import 'rxjs/add/observable/throw';

xdescribe('TodosComponent', () => {
  let component: TodosComponent;
  let service: TodoService;

  beforeEach(() => {
      service = new TodoService(null);
      component = new TodosComponent(service);
  });

  it('should set todos property with items returned from ', () => {
      let todos = [1, 2, 3];

      spyOn(service, 'getTodos').and.callFake(() => {
          return Observable.from([
              [1, 2, 3]
          ]);
      });

      component.ngOnInit();
      expect(component.todos.length).toBe(3);
  });

  it('should call the server to save the changes when a new todo item is added', () => {
      let spy = spyOn(service, 'add').and.callFake(t => {
          return Observable.empty();
      });

      component.add();

      expect(spy).toHaveBeenCalled();
  });

  it('should add the new todo returned from the server', () => {
      let todo = { title: '... ' };
      let spy = spyOn(service, 'add').and.returnValue(Observable.from([todo]));

      component.add();

      expect(component.todos.indexOf(todo)).toBeGreaterThan(-1);
  });

  it('should set the new message property if server returns an error when adding a new', () => {
      let todo = { id:1 };
      let error = 'error from the server';
      let spy = spyOn(service, 'add').and.returnValue(Observable.throw(error));

      component.add();

      expect(component.message).toBe(error);
  });

  xit('should call the server to delete a todo item if the user confirms', () => {
      spyOn(window, 'confirm').and.returnValue(true);
      let spy = spyOn(service, 'delete').and.returnValue(Observable.empty());

      component.delete(1);

      expect(spy).toHaveBeenCalledWith(1);
  });

  xit('should not call the server to delete a todi item if the user refuses', () => {
      spyOn(window, 'confirm').and.returnValue(true);
      let spy = spyOn(service, 'delete').and.returnValue(Observable.empty());

      component.delete(1);

      expect(spy).toHaveBeenCalledWith(1);
  });

});