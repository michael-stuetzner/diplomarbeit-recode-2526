package at.htl.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

import java.time.LocalDateTime;

@Entity
public class UserData {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDateTime chatStartTime;
    private LocalDateTime chatEndTime;
    private String userName;
    private UserRole userRole;
    private boolean requestedDownload;
    private int FeedbackRating;
    private int messageCount;
    private String feedbackMessage;

    public UserData() {
    }

    public UserData(LocalDateTime chatStartTime, LocalDateTime chatEndTime, String userName, UserRole userRole, boolean requestedDownload, int feedbackRating, int messageCount, String feedbackMessage) {
        this.chatStartTime = chatStartTime;
        this.chatEndTime = chatEndTime;
        this.userName = userName;
        this.userRole = userRole;
        this.requestedDownload = requestedDownload;
        FeedbackRating = feedbackRating;
        this.messageCount = messageCount;
        this.feedbackMessage = feedbackMessage;
    }

    public int getMessageCount() {
        return messageCount;
    }

    public void setMessageCount(int messageCount) {
        this.messageCount = messageCount;
    }

    public LocalDateTime getChatStartTime() {
        return chatStartTime;
    }

    public void setChatStartTime(LocalDateTime chatStartTime) {
        this.chatStartTime = chatStartTime;
    }

    public LocalDateTime getChatEndTime() {
        return chatEndTime;
    }

    public void setChatEndTime(LocalDateTime chatEndTime) {
        this.chatEndTime = chatEndTime;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public UserRole getUserRole() {
        return userRole;
    }

    public void setUserRole(UserRole userRole) {
        this.userRole = userRole;
    }

    public boolean isRequestedDownload() {
        return requestedDownload;
    }

    public void setRequestedDownload(boolean requestedDownload) {
        this.requestedDownload = requestedDownload;
    }

    public int getFeedbackRating() {
        return FeedbackRating;
    }

    public void setFeedbackRating(int feedbackRating) {
        FeedbackRating = feedbackRating;
    }

    public String getFeedbackMessage() {
        return feedbackMessage;
    }

    public void setFeedbackMessage(String feedbackMessage) {
        this.feedbackMessage = feedbackMessage;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }
}