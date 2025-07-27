package at.htl.control;

import at.htl.model.UserData;
import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class UserDataRepository implements PanacheRepository<UserData> {
}
