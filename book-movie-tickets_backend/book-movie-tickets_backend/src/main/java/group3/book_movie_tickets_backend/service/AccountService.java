package group3.book_movie_tickets_backend.service;

import group3.book_movie_tickets_backend.entity.Account;
import group3.book_movie_tickets_backend.entity.changePasswordRequest;
import group3.book_movie_tickets_backend.form.ChangePasswordForm;
import group3.book_movie_tickets_backend.repository.IAccountRepository;
import group3.book_movie_tickets_backend.repository.IChangePasswordRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Random;

@Service
public class AccountService implements IAccountService {
    @Autowired
    private JavaMailSender mailSender;
    @Autowired
    private IAccountRepository repository ;
    @Autowired
    private IChangePasswordRepository changePasswordRepository ;

    @Override
    public List<Account> findAll() {

        return new ArrayList<>(repository.findAll());
    }
    //Change Password
    @Override
    public void changePassword(ChangePasswordForm form) {
        Account account = repository.findByEmail(form.getEmail()).orElseThrow() ;
        account.setPassword(form.getPassword());
        repository.save(account) ;
    }

    @Override
    public ResponseEntity<String> sendCode(String email) {
        if (repository.existsByEmail(email)) {
            int randomNumber = new Random().nextInt(1000000);
            String code = String.format("%06d", randomNumber);
            try {

                SimpleMailMessage mailMessage
                        = new SimpleMailMessage();

                mailMessage.setFrom("${spring.mail.username}");
                mailMessage.setTo(email);
                mailMessage.setText(code);
                mailMessage.setSubject("Code Change Password");

                // Sending code to the mail
                mailSender.send(mailMessage);
                changePasswordRepository.findByEmail(email).ifPresent(changePasswordRequest -> changePasswordRepository.delete(changePasswordRequest));
                changePasswordRequest request = new changePasswordRequest();
                request.setEmail(email);
                request.setCode(code);
                request.setDuration(30000);
                changePasswordRepository.save(request);
                return ResponseEntity.ok(code);
            } catch (Exception e) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error while Sending Mail");
            }
        }
        else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Email is not Valid!");
        }
    }
    //Change Password - End
    //authenticateCodeAndEmail - Begin
    @Override
    public ResponseEntity<String> authenticateCodeAndEmail(String email, String code) {
        try {
            Optional<changePasswordRequest> request = changePasswordRepository.findByEmail(email);
            if (request.isPresent()) {
                Boolean checkExpiredAt = request.get().getCreatedAt().plusSeconds( request.get().getDuration()).isAfter(LocalDateTime.now()) ;
                System.out.println("checkExpiredAt : " + checkExpiredAt);
                System.out.println("checkExpiredAt : " + request.get().getCreatedAt());
                System.out.println("checkExpiredAt : " +  request.get().getCreatedAt().plusSeconds( request.get().getDuration()));
                System.out.println("checkExpiredAt : " +  LocalDateTime.now());
                if (code.equals(request.get().getCode()) && Boolean.TRUE.equals(checkExpiredAt) ) {
                    changePasswordRepository.delete(request.get());
                    return ResponseEntity.ok(email);
                }
                else {
                    return  ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Code is not valid!");
                }
            }
            else
            {
                return  ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Email is not valid!");
            }
        }
        catch (Exception e) {
            return  ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }
    //authenticateCodeAndEmail - End

}
